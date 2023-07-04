import { Button, Image } from "react-bootstrap";
import styles from "./SelectCover.module.css";
import { useState, useEffect } from 'react';
import { isReadable } from "stream";
import CollectionService from "../../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { useDispatch } from "react-redux";
import { collectionAction } from "../../redux/actions/collectionAction";
import { NotificationWithIcon } from "../../Utils/helper";

interface Props {
    imageUrl: string,
    collectionid: any,
    onHide: any,
    mainhide: any
}

const SelectCover = ({ imageUrl, collectionid, onHide, mainhide }: Props) => {

    const dispatch = useDispatch()

    const handleClick = async () => {
        try {
            if (collectionid) {
                onHide()
                mainhide()
                const updateRes = await CollectionService.updateCollection(collectionid, { coverPhoto: imageUrl })
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
        <div className={styles.outerimg} >
            <div className={styles.imgblock}>
                <div className={styles.imgdiv}>
                    <div className={styles.overlay}></div>
                    <Image className={styles.myimage} src={imageUrl} />
                    <div className={styles.button} onClick={handleClick}>Select</div>
                    {/* <Button className={styles.setbutton} onClick={handleClick} variant="outline-danger">Select</Button> */}
                </div>
            </div>
        </div>
    )
}

export default SelectCover