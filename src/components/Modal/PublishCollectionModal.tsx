import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import styles from "./CreateCollectionModal.module.css";
import { Formik } from "formik";
import { collectionValidations } from "../../Utils/validations";
import CollectionService from "../../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";
import { useSelector, useDispatch } from 'react-redux'
import { collectionAction } from "../../redux/actions/collectionAction";
import { useState } from "react";

function PublishCollectionModal(props: any) {

    const collectionId = props?.id
    const [btnLoader, setBtnLoader] = useState(false)
    const dispatch = useDispatch()

    const publishCollection = async () => {
        setBtnLoader(true)
        try {
            if (collectionId) {
                const res = await CollectionService.updateCollection(collectionId as string, { status: "PUBLISH" })
                if (res && res?.code === STATUS_CODE.SUCCESS) {
                    setBtnLoader(false)
                    NotificationWithIcon("success", "Your collection has been published.")
                    dispatch(collectionAction({ collection: res.result }))
                    props.onHide()
                }
            }
        } catch (error) {
            console.log("error", error)
            NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
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
                    <p className={styles.maintitle}>Ready To Publish ?</p>
                </div>
                <div>
                    Once the collection is published, you will be able to view it online and share it with your clients. You can edit this collection at anytime by returning to your dashboard.
                </div>
                <div className={styles.buttondiv}>
                    <Button className={styles.cancelbtn} variant="custom" onClick={props.onHide} type="submit">Cancel</Button>
                    {
                        btnLoader ?
                            <Button className={styles.createbtn} onClick={publishCollection} variant="custom" type="submit" disabled>Publishing...</Button> :
                            <Button className={styles.createbtn} onClick={publishCollection} variant="custom" type="submit">Publish</Button>
                    }
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default PublishCollectionModal;
