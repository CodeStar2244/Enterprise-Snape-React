import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from "./ChangeCoverModal.module.css";
import { useParams } from 'react-router-dom';
import FilesSevice from '../../api/Files/files';
import { STATUS_CODE } from '../../Utils/constants';
import SelectCover from '../Gallery/SelectCover';

function SelectCoverModal(props: any) {

    const { files } = props
    const { collectionId } = useParams()
    return (
        <>
            <Modal  {...props} fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.headingtitle}>Change Cover</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={styles.outermain}>
                        {
                            (files && files.length ) ? files.map((file: any) => (
                                <SelectCover
                                    key={file?.id}
                                    imageUrl={file?.url}
                                    collectionid={collectionId}
                                    onHide={props?.onHide}
                                    mainhide={props?.mainhide}
                                />
                            )):
                            <></>
                        }
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default SelectCoverModal;
