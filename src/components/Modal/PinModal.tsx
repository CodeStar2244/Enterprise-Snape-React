import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import styles from "./FileRenameModal.module.css";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

function PinModal(props: any) {

    const [pin, setPin] = useState("")

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className={styles.maincomp}>
                <div className={styles.maintitlediv}>
                    <p className={styles.maintitle}>Download Collection</p>
                </div>
                <Form className={styles.formdiv} >
                    <div className={styles.formcomp}>
                        <Form.Group className={styles.client} controlId="validationFormik01">
                            <Form.Label className={styles.formlabel}>
                                Enter Pin
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="pin"
                                value={pin}
                                onChange={(event: any) => setPin(event.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className={styles.buttondiv}>
                        <Button className={styles.createbtn} onClick={() => props.downloadfunction(pin)} variant="custom">Download</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
}

export default PinModal;
