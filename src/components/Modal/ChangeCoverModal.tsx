import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import DragMedia from "../Gallery/DragMedia";
import { useDropzone } from "react-dropzone";
import React, { useState, useCallback, useMemo } from 'react';
import styles from "./ChangeCoverModal.module.css";
import SelectCoverModal from "./SelectCoverModal";
import ProgressBar from "./ProgressBar";

const baseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    transition: 'border .3s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export interface UploadableFile {
    file: File;
    errors: []
}

function ChangeCoverModal(props: any) {
    const [files, setFiles] = useState<UploadableFile[]>([])

    const onDrop = useCallback((acceptedFiles: any, rejFiles: any) => {
        const mappedAcc = acceptedFiles.map((file: any) => ({ file, errors: [] }))
        setFiles([...mappedAcc, ...rejFiles])
    }, [])

    const {
        getRootProps,
        getInputProps,
        open,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/*',
        noClick: true,
        multiple: false
    });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    const [show, setShow] = useState(false);

    const handleState = () => {
        props.onHide()
        setFiles([])
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className={styles.headingtitle}>Change Cover</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.maincomp}>
                {
                    files && files.length ?
                        <ProgressBar filedata={files[0].file} completeupload={handleState} />
                        :
                        <div {...getRootProps({ style })} >
                            <div className={styles.addmedia}>
                                <p className={styles.nomedia}>
                                    Drag photos here
                                </p>
                                <div>
                                    <input {...getInputProps()} />
                                    <Button className={styles.dragbtn} variant="custom" onClick={open}>
                                        Select photos from your computer
                                    </Button>
                                </div>
                                <br />
                                <Button className={styles.dragbtn} variant="custom" onClick={() => setShow(true)}>Select photos from collection</Button>
                            </div>
                        </div>
                }

            </Modal.Body>
            <SelectCoverModal
                show={show}
                onHide={() => setShow(false)}
                files={props?.files}
                collectionid={props.collectionid}
                mainhide={props.onHide}
            />
        </Modal>
    );
}

export default ChangeCoverModal;
