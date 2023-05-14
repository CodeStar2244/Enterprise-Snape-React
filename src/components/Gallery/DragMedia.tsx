import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import styles from "./DragMedia.module.css";
import SingleFileUpload from './SingleFileUpload';
import DagPhotoNav from './DragPhotoNav';
import RejectFile from './RejectFile';
import UploadDoneNav from './UploadDoneNav';
import FilesSevice from '../../api/Files/files';
import { useNavigate, useParams } from 'react-router-dom';
import { MESSAGE, STATUS_CODE, VALIDATIONS } from '../../Utils/constants';
import { NotificationWithIcon } from '../../Utils/helper';
import { useSelector } from 'react-redux';
import DashboardService from '../../api/Dashboard/dashboard';

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
function DragMedia() {

    const { collectionId } = useParams()
    const [errFileName, setErrFileName] = useState<UploadableFile[]>([])
    const [allFiles, setAllFiles] = useState([""])
    const [storage, setStorage]: any = useState({})
    const navigate = useNavigate();

    const getUserStorage = async () => {
        try {
            const res = await DashboardService.getUserStorage()
            if (res && res?.code === STATUS_CODE.SUCCESS) {
                setStorage(res?.result)
                if (res?.result?.remainingSpace < 10) {
                    navigate(`/gallery/collection/${collectionId}`)
                    NotificationWithIcon("error", "You don't have enough storage")
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
    useEffect(() => {
        getFileNames()
        getUserStorage()
    }, [])

    async function getFileNames() {
        try {
            if (collectionId) {
                const fileRes = await FilesSevice.getFileName(collectionId)
                if (fileRes && fileRes?.code === STATUS_CODE.SUCCESS) {
                    setAllFiles(fileRes.result)
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

    const myState = useSelector((state: any) => state.setFiles)
    const [files, setFiles] = useState<UploadableFile[]>([])
    const onDrop = useCallback((acceptedFiles: any, rejFiles: any) => {

        let totalSize = 0

        acceptedFiles.forEach((file: any) => {
            totalSize = totalSize + file?.size
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const image = new Image();
                image.addEventListener('load', () => {
                    file.height = image.height
                    file.width = image.width
                });
                image.src = URL.createObjectURL(file)
            }
            reader.readAsArrayBuffer(file)
        })
        totalSize = (totalSize / 1024 ** 2)
        let mappedAcc = []
        if (totalSize > storage?.remainingSpace) {
            mappedAcc = acceptedFiles.map((file: any) => {
                if (file.name) {
                    return { file, errors: ['Storage full'] }
                }
            })
        } else {
            mappedAcc = acceptedFiles.map((file: any) => {
                if (file.name) {
                    if (allFiles.includes(file.name)) {
                        setErrFileName((preFile: any) => [...preFile, { file, errors: [] }])
                        return { file, errors: ['Duplicate file'] }
                    }
                    else {
                        return { file, errors: [] }
                    }
                }
            })
        }
        setFiles([...mappedAcc, ...rejFiles])
    }, [allFiles])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        accept: 'image/*'
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

    const handleState = () => {
        setFiles([])
        setErrFileName([])
        getFileNames()
    }

    const [duplicateDrop, setDuplicateDrop] = useState(false)
    const handleDuplicateChange = (event: any) => {
        setDuplicateDrop(Boolean(Number(event.target.value)))
    }

    const handleReplace = () => {
        if (duplicateDrop) {
            setFiles(errFileName)
        }
    }

    return (
        <>
            <div className={styles.outermain}>
                {
                    files.length ?
                        <>
                            <UploadDoneNav handleSetChange={handleState} />
                            {
                                errFileName && errFileName.length ?
                                    <div className={styles.errormain}>
                                        <div className={styles.dropnav}>
                                            <Form.Group className={styles.dropdownset}>
                                                <Form.Select
                                                    id="disabledSelect"
                                                    className={styles.dropmain}
                                                    onChange={handleDuplicateChange}
                                                    value={duplicateDrop ? 1 : 0}
                                                >
                                                    <option className={styles.dropoption} value={0}>
                                                        Skip duplicates
                                                    </option>
                                                    <option className={styles.dropoption} value={1}>
                                                        Replace duplicates
                                                    </option>
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                        <div>
                                            <div className={styles.errordiv}>
                                                <div className={styles.titlemain}>
                                                    Errors:
                                                </div>
                                                {
                                                    errFileName.map((errfile: any) => (
                                                        <div className={styles.errfile}>
                                                            {errfile?.file?.name}
                                                        </div>
                                                    ))

                                                }
                                            </div>
                                            <div className={styles.retrybtn}>
                                                <button className={styles.retry} onClick={handleReplace}>
                                                    Retry Errors
                                                </button>
                                            </div>
                                        </div>
                                    </div> : <></>
                            }
                            {files.map((file: any, index: any) => (
                                file?.errors?.length === 0 ?
                                    <SingleFileUpload filedata={file.file} key={index} /> :
                                    <RejectFile filedata={file.file} fileerror={file.errors} key={index} />
                            ))}
                        </>
                        :
                        <>
                            <DagPhotoNav />
                            <div {...getRootProps({ style })}>
                                <input {...getInputProps()} />
                                <div className={styles.addmedia}>
                                    <p className={styles.nomedia}>
                                        Drag photos here
                                    </p>
                                    <Button className={styles.dragbtn} variant="custom">Select photos from your computer</Button>
                                </div>
                            </div>
                        </>
                }

            </div>
        </>
    )
}

export default DragMedia;