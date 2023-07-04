import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import styles from "./PasswordModal.module.css";
import { Formik } from "formik";
import { collectionValidations } from "../../Utils/validations";
import CollectionService from "../../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";
import { useSelector, useDispatch } from 'react-redux'
import { collectionAction } from "../../redux/actions/collectionAction";

function PasswordModal(props: any) {

    let formInitialValues = {
        password:"ou"
    }
    const handleSubmit = async (values: any) => {
        try {
            props.onSubmit(values.password)
        } catch (error:any) {
            

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
                <Formik
                    initialValues={formInitialValues}
                    onSubmit={handleSubmit}>
                    {({
                        handleSubmit,
                        handleChange,
                        touched,
                        errors,
                    }) => (
                        <Form className={styles.formdiv} onSubmit={handleSubmit}>
                            <div className={styles.formcomp}>
                                <Form.Group className={styles.client} controlId="validationFormik01">
                                    <Form.Label className={styles.formlabel}>
                                        Enter Collection Password
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        onChange={handleChange}
                                        isValid={touched.password && !errors.password}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <p>{errors.password}</p>
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className={styles.buttondiv}>
                                <Button className={styles.createbtn} variant="custom" type="submit">View Collection</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default PasswordModal;
