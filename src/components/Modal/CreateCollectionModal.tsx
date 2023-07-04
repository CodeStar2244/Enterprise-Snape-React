import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import styles from "./CreateCollectionModal.module.css";
import { Formik } from "formik";
import { collectionValidations } from "../../Utils/validations";
import CollectionService from "../../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";
import { useDispatch } from 'react-redux'
import { collectionAction } from "../../redux/actions/collectionAction";
import moment from "moment";
import { useState } from "react";

function CreateCollectionModal(props: any) {

    let formInitialValues = {
        name: props?.name as string || "",
        eventDate: props?.eventdate as string,
    }
    const dispatch = useDispatch()
    const collectionId = props?.id

    const [loader, setLoader] = useState(false)

    const navigate = useNavigate()
    const handleSubmit = async (values: any) => {
        setLoader(true)
        try {
            if (collectionId) {
                const updateRes = await CollectionService.updateCollection(collectionId, values)
                if (updateRes && updateRes?.code === STATUS_CODE.SUCCESS) {
                    setLoader(false)
                    dispatch(collectionAction({ collection: updateRes.result }))
                    props.onSubmit(values)
                    props.onHide()
                }
            } else {
                const res = await CollectionService.createCollection(values)
                if (res && res?.code === STATUS_CODE.SUCCESS) {
                    setLoader(false)
                    dispatch(collectionAction({ collection: res.result }))
                    const createId = res?.result?.id
                    navigate(`/gallery/collection/${createId}`)
                }
            }
        } catch (err: any) {
            if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
                NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
                navigate('/');
            } else {
                NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
            }
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className={styles.maincomp}>
                <div className={styles.maintitlediv}>
                    <p className={styles.maintitle}>Create New Collection</p>
                </div>
                <Formik
                    initialValues={formInitialValues}
                    onSubmit={handleSubmit}
                    validationSchema={collectionValidations}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        touched,
                        isValid,
                        errors,
                    }) => (
                        <Form className={styles.formdiv} onSubmit={handleSubmit}>
                            <div className={styles.formcomp}>
                                <Form.Group className={styles.client} controlId="validationFormik01">
                                    <Form.Label className={styles.formlabel}>
                                        Give your collection a name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        isValid={touched.name && !errors.name}
                                        isInvalid={!!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <p>{errors.name}</p>
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className={styles.formcomp}>
                                <Form.Group className={styles.client} controlId="validationFormik01">
                                    <Form.Label className={styles.formlabel}>
                                        What is the date of the event
                                    </Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="date"
                                            name="eventDate"
                                            value={moment(values.eventDate).format('yyyy-MM-DD')}
                                            onChange={handleChange}
                                            isValid={touched.eventDate && !errors.eventDate}
                                            isInvalid={!!errors.eventDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            <p>{errors.eventDate}</p>
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                {loader}
                            </div>
                            <div className={styles.buttondiv}>
                                {
                                    props.createnew === "true" ? (
                                        loader ?
                                            < Button className={styles.createbtn} variant="custom" disabled type="submit">
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />{'  '}
                                                Creating...
                                            </Button> :
                                            < Button className={styles.createbtn} variant="custom" type="submit">Create</Button>
                                    ) : (
                                        loader ?
                                            < Button className={styles.createbtn} variant="custom" disabled type="submit">
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />{'  '}
                                                Saving...
                                            </Button> :
                                            < Button className={styles.createbtn} variant="custom" type="submit">Save</Button>
                                    )
                                }
                                <Button className={styles.cancelbtn} onClick={props.onHide} variant="custom">Cancel</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal >
    );
}

export default CreateCollectionModal;
