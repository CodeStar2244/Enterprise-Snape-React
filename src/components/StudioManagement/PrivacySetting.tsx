import { FunctionComponent, useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Constants from "../../Config/Constants";
import { useParams } from "react-router-dom"
import styles from "./PrivacySetting.module.css"
import CollectionService from "../../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";
const passwordGeneator = require('secure-random-password');
import { useSelector, useDispatch } from 'react-redux'
import { collectionAction } from "../../redux/actions/collectionAction";

const PrivacySetting: FunctionComponent = () => {

    const { collectionId } = useParams()

    const [passwordBtn, setPasswordBtn] = useState(false);
    const [password, setPassword] = useState("")
    const [iniPassword, setInitPasswod] = useState("")
    const myState = useSelector((state: any) => state.changeCollection)
    const dispatch = useDispatch()

    const getCollectionList = async () => {
        try {
            if (collectionId) {
                const res = myState.collection
                if (Object.keys(res).length !== 0) {
                    setInitPasswod(res.password ? res?.password : "")
                    setPassword(res.password ? res?.password : "")
                } else {
                    const res = await CollectionService.getCollectionById(collectionId as string)
                    if (res && res?.code === STATUS_CODE.SUCCESS) {
                        dispatch(collectionAction({ collection: res.result }))
                        setInitPasswod(res.result.password ? res.result?.password : "")
                        setPassword(res.result.password ? res.result?.password : "")
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

    const updateData = async () => {
        try {
            if (collectionId) {
                const values = { password }
                const updateRes = await CollectionService.updateCollection(collectionId, values)
                if (updateRes && updateRes?.code === STATUS_CODE.SUCCESS) {
                    dispatch(collectionAction({ collection: updateRes.result }))
                    NotificationWithIcon("success", "Setting saved.")
                    setPasswordBtn(false)
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
    }, [])

    const handleCancel = () => {
        setPassword("")
        setPasswordBtn(false)
    }

    const generatePassword = async () => {
        const userPassword = passwordGeneator.randomPassword({ length: 8, characters: [passwordGeneator.lower, passwordGeneator.upper, passwordGeneator.digits] })
        try {
            if (collectionId) {
                const values = { password: userPassword }
                const updateRes = await CollectionService.updateCollection(collectionId, values)
                if (updateRes && updateRes?.code === STATUS_CODE.SUCCESS) {
                    NotificationWithIcon("success", "Setting saved.")
                    setPassword(userPassword)
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

    const handleChange = (event: any) => {
        setPassword(event.target.value)
        if (event.target.value !== iniPassword) {
            setPasswordBtn(true)
        } else if (password && event.target.value === iniPassword) {
            setPasswordBtn(false)
        }
    }

    return (
        <>
            <div className={styles.maincomponent}>
                <Form>
                    <Form.Label className={styles.sidemaintitle}>Privacy</Form.Label>
                    <div className={styles.formcomp}>
                        <Form.Label className={styles.formlabel}>Collection Password</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                value={password}
                                aria-label="Password"
                                aria-describedby=""
                                name="password"
                                onChange={handleChange}
                            />
                            {
                                passwordBtn ?
                                    <>
                                        <Button variant="outline-danger" name="name" onClick={handleCancel}>Cancel</Button>
                                        <Button variant="danger" name="name" onClick={updateData}>Save</Button>
                                    </> :
                                    <Button variant="outline-secondary" id="button-addon2" onClick={generatePassword}>
                                        Generate
                                    </Button>
                            }

                        </InputGroup>
                        <Form.Label className={styles.helpbox} muted>
                            Leave blank to make this collection public. Setting a password will require all guests to use this password in order see this collection.
                        </Form.Label>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default PrivacySetting;
