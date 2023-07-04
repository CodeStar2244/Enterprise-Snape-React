import { FunctionComponent, useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Constants from "../../Config/Constants";
import { useParams } from "react-router-dom"
import styles from "./DownloadStatus.module.css"
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import CollectionService from "../../api/Collection/collection";
import { NotificationWithIcon } from "../../Utils/helper";
const passwordGeneator = require('secure-random-password');
import { useSelector, useDispatch } from 'react-redux'
import { collectionAction } from "../../redux/actions/collectionAction";

const DownloadStatus: FunctionComponent = () => {

    const { collectionId } = useParams()
    const [formdata, setFormData] = useState(false)
    const myState = useSelector((state: any) => state.changeCollection)
    const dispatch = useDispatch()
    const [errmsg, setErrmsg] = useState("")

    const getCollectionList = async () => {
        try {
            if (collectionId) {
                const res = myState.collection
                if (Object.keys(res).length !== 0) {
                    setFormData(res.download)
                    setPin(res?.downloadPin || "")
                    setInitPin(res?.downloadPin || "")
                } else {
                    const res = await CollectionService.getCollectionById(collectionId as string)
                    if (res && res?.code === STATUS_CODE.SUCCESS) {
                        setPin(res?.result?.downloadPin || "")
                        setInitPin(res?.result?.downloadPin || "")
                        dispatch(collectionAction({ collection: res.result }))
                    }
                }

            }
        } catch (err: any) {
            if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
                NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
            } else {
                NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
            }
        }
    }

    useEffect(() => {
        getCollectionList();
    }, [myState])

    const updateCollection = async (values: any) => {
        try {
            if (collectionId && (pin.length === 4)) {
                const updateRes = await CollectionService.updateCollection(collectionId, values)
                if (updateRes && updateRes?.code === STATUS_CODE.SUCCESS) {
                    dispatch(collectionAction({ collection: updateRes.result }))
                    NotificationWithIcon("success", "Setting saved.")
                    setFormData(updateRes?.result?.download)
                    setPin(updateRes?.result?.downloadPin || "")
                    setInitPin(updateRes?.result?.downloadPin || "")
                    // if (event.target.name === 'pin') {
                    // setPasswordBtn(false)
                    // }
                }
            }
        } catch (err: any) {
            if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
                NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
            } else {
                NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
            }
        }
    }

    const [pin, setPin] = useState("")
    const [passwordBtn, setPasswordBtn] = useState(false);
    const [iniPin, setInitPin] = useState("")
    const handleSave = async (event: any) => {
        let values
        if (event.target.name === 'status') {
            values = { download: Boolean(Number(event.target.value)) }
            await updateCollection(values)
        } else if (event.target.name === 'pin') {
            if (pin.length !== 4) {
                setErrmsg("Enter 4 digits pin.")
            } else {
                setErrmsg("")
                values = { downloadPin: pin }
                await updateCollection(values)
                setPasswordBtn(false)
            }
        }
    }

    const generatePassword = async () => {
        const userPin = passwordGeneator.randomPassword({ length: 4, characters: [passwordGeneator.digits] })
        try {
            if (collectionId) {
                const values = { downloadPin: userPin }
                const updateRes = await CollectionService.updateCollection(collectionId, values)
                if (updateRes && updateRes?.code === STATUS_CODE.SUCCESS) {
                    NotificationWithIcon("success", "Setting saved.")
                    setPin(userPin)
                }
            }
        } catch (err: any) {
            if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
                NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
            } else {
                NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
            }
        }
    }

    const handleCancel = () => {
        setPin("")
        setPasswordBtn(false)
    }

    const handleChange = (event: any) => {
        setPin(event.target.value)
        if (event.target.value !== iniPin) {
            setPasswordBtn(true)
        } else if (pin && event.target.value === iniPin) {
            setPasswordBtn(false)
        }
    }

    return (
        <>
            <div className={styles.maincomponent}>
                <Form>
                    <Form.Label className={styles.sidemaintitle}>Download Status</Form.Label>
                    <div className={styles.formcomp}>
                        <Form.Label className={styles.formlabel}>Gallery Download</Form.Label>
                        <Form.Select name="status" onChange={handleSave} value={formdata ? 1 : 0}>
                            <option value={1} >Yes</option>
                            <option value={0}>No</option>
                        </Form.Select>
                        <Form.Label className={styles.helpbox} muted>
                            Turn on to allow your clients to download from this Colection.
                        </Form.Label>
                    </div>
                    <div className={styles.formcomp}>
                        <Form.Label className={styles.formlabel}>Download Pin</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder=""
                                name="pin"
                                value={pin}
                                onChange={handleChange}
                            />
                            {
                                passwordBtn ?
                                    <>
                                        <Button variant="outline-danger" name="name" onClick={handleCancel}>Cancel</Button>
                                        <Button variant="danger" name="pin" onClick={handleSave}>Save</Button>
                                    </> :
                                    <Button variant="outline-secondary" id="button-addon2" onClick={generatePassword}>
                                        Generate
                                    </Button>
                            }
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                            <p>{errmsg}</p>
                        </Form.Control.Feedback>
                    </div>

                </Form>
            </div>
        </>
    );
};

export default DownloadStatus;
