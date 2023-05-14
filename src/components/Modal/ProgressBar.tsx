import React, { useEffect, useState } from 'react';
import { Progress, Space } from 'antd';
import { useParams } from "react-router-dom";
import { S3 } from "@aws-sdk/client-s3";
import Spinner from 'react-bootstrap/Spinner';
import { XhrHttpHandler } from "@aws-sdk/xhr-http-handler";
import FilesSevice from '../../api/Files/files';
import { Upload } from "@aws-sdk/lib-storage";
import CollectionService from '../../api/Collection/collection';
import { MESSAGE, STATUS_CODE, VALIDATIONS } from '../../Utils/constants';
import { useSelector, useDispatch } from 'react-redux'
import { collectionAction } from '../../redux/actions/collectionAction';
import { NotificationWithIcon } from '../../Utils/helper';

const ProgressBar: any = ({ filedata, completeupload }: any) => {

    const { collectionId } = useParams()
    const dispatch = useDispatch()
    const [progress, setProgress] = useState(0)
    const [isCompleted, setComplete] = useState(false)

    useEffect(() => {
        function upload() {
            uploadFile(filedata)
        }
        upload()
    }, [])

    function uploadFile(file: any) {
        if (file) {
            const Key = `${collectionId}/cover/${file.name}`
            const Bucket = process.env.REACT_APP_AWS_BUCKET_NAME
            const Body: any = file
            try {
                const s3 = new S3({
                    requestHandler: new XhrHttpHandler({}),
                    region: process.env.REACT_APP_WASABI_REGION,
                    endpoint:process.env.REACT_APP_WASABI_ENDPOINT,
                    credentials: {
                        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY as string,
                        secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY as string
                    }

                })
                const parallelUploads3 = new Upload({
                    client: s3,
                    params: { Bucket, Key, Body },
                    queueSize: 4,
                    leavePartsOnError: false,
                });
                parallelUploads3.on("httpUploadProgress", (progress: any) => {
                    setProgress(Math.round(progress.loaded / progress.total * 100))
                    if (Math.round(progress.loaded / progress.total * 100) >= 100) {
                        setComplete(true)
                    }
                });
                parallelUploads3.done().then((result) => {
                    uploadDone(result);
                });

            } catch (e) {
            }
        }
    }

    const uploadDone = async (uploadResult: any) => {
        try {
            await updateData({ coverPhoto: uploadResult?.Location })
            completeupload()
        } catch (error) {
        }
    }

    const updateData = async (values: any) => {
        try {
            if (collectionId) {
                const updateRes = await CollectionService.updateCollection(collectionId, values)
                if (updateRes && updateRes?.code === STATUS_CODE.SUCCESS) {
                    dispatch(collectionAction({ collection: updateRes.result }))
                    NotificationWithIcon("success", "Setting saved.")
                    return updateRes?.result?.name
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

    return (
        <div style={{ textAlign: 'center', padding: '10%' }}>
            <Space wrap>
                <Progress type="dashboard" percent={progress} />
            </Space>
        </div>
    )
}

export default ProgressBar;