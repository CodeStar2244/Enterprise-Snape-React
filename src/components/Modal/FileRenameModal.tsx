import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import styles from "./FileRenameModal.module.css";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

function FileRenameModal(props: any) {

    const collectionId = props?.id
    const [imagedetails, setImageDetails]: any = useState({})
    const [imagename, setImageName]: any = useState("")
    const [allFiles, setAllFiles] = useState([""])
    const [errMsg, setErrMsg] = useState(false)

    useEffect(() => {
        getData()
    }, [props.fileid, props.filenames])

    const getData = () => {
        const [fullData] = props.collectiondata.filter((image: any) => image.id === props.fileid);
        setImageName(fullData?.name)
        setImageDetails(fullData)
        setAllFiles(props.filenames)
    }

    const handleChange = (event: any) => {
        setImageName(event.target.value)
        if (allFiles.includes(event.target.value)) {
            setErrMsg(true)
        } else {
            setErrMsg(false)
        }
    }


    const handleSubmit = () => {

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
                    <p className={styles.maintitle}>Rename file</p>
                </div>
                <Form className={styles.formdiv} onSubmit={handleSubmit}>
                    <div className={styles.formcomp}>
                        <Form.Group className={styles.client} controlId="validationFormik01">
                            <Form.Label className={styles.formlabel}>
                                Filename
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={imagename}
                                onChange={handleChange}
                            />
                            {
                                errMsg ?
                                    <Form.Control.Feedback type="invalid">
                                        <p>Filename already exists in this photo Set.</p>
                                    </Form.Control.Feedback> :
                                    <Form.Control.Feedback type="invalid">
                                        <p></p>
                                    </Form.Control.Feedback>
                            }

                        </Form.Group>
                    </div>
                    <div className={styles.buttondiv}>
                        <Button
                            className={styles.createbtn}
                            variant="custom"
                            type="submit"
                            disabled={errMsg ? true : false}
                        >
                            Save
                        </Button>
                        <Button className={styles.cancelbtn} onClick={props.onHide} variant="custom">Cancel</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
}

export default FileRenameModal;
