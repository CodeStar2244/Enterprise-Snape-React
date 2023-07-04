import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
import styles from "./DeleteConfirmation.module.css";
import { useState } from 'react';

function DeleteConfirmation(props: any) {

    const handleDelete = () => {
        setDeleteLoader(true)
        props.handledeletefiles().then(() => {
            setDeleteLoader(false)
        })
    }

    const [deleteloader, setDeleteLoader] = useState(false)

    return (
        <Modal
            show={props.show} onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className={styles.maincomp}>
                <div className={styles.maintitlediv}>
                    <p className={styles.maintitle}>{props.modaltext}</p>
                </div>
                <div className={styles.buttondiv}>
                    {
                        deleteloader ?
                            <Button className={styles.createbtn} onClick={handleDelete} variant="custom" type="submit" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />{'  '}
                                Deleting...
                            </Button> :
                            <Button className={styles.createbtn} onClick={handleDelete} variant="custom" type="submit">Delete</Button>

                    }
                    <Button className={styles.cancelbtn} onClick={props.onHide} variant="custom" type="submit">Cancel</Button>
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default DeleteConfirmation;
