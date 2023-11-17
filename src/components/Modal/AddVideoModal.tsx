import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
import { useState } from 'react';
import styles from './AddVideoModal.module.css';
import { Image } from "react-bootstrap";
import { NotificationWithIcon } from "../../Utils/helper";
import CollectionService from "../../api/Collection/collection";

function AddVideoModal(props: any) {

    const [isLoading, setIsLoading] = useState(false);
    const [videoURL, setVideoURL] = useState("");
    const handleAddVideo = async () => {
        setIsLoading(true);
        try{
            // api call here
            await CollectionService.addVideo({videoURL, collectionId: props.collectionId })
            NotificationWithIcon("success","Video Added Successfully.")
            props.onHide();
        } catch(err){
            
            NotificationWithIcon("error","Something went wrong.")
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <Modal
            show={props.show} onHide={props.onHide}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
        >
            <Modal.Body >
                {isLoading ?
                    <>
                        <span>Adding your Video &nbsp; </span>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                    </>
                    :
                    <div className="mx-4 my-3">
                        <h2 className="center mb-4">Add Video</h2>
                        <div className={`${styles.imgs} py-2`}>
                            <Image className="me-3" src="/youtube_logo.png" />
                            <Image src="/vimeo_logo.png" />
                        </div>
                        <form className="mt-4 mb-2">
                            <div className="form-group">
                                <label className="mb-2 font-weight-bold" htmlFor="videoURL">Video URL</label>
                                <input onInput={(e: any) => setVideoURL(e.target.value)} className="form-control" type="text" placeholder="https://www.youtube.com/watch?v=oIfsqKztmH4" />
                            </div>
                        </form>
                        <small>Add a video from YouTube or Vimeo by entering the full video URL.</small>
                        <div className={`${styles.btns} mt-4`}>
                            <Button className="btn-dark me-2" onClick={props.onHide} variant="custom" type="button">Cancel</Button>
                            <Button className="btn-danger" onClick={handleAddVideo} variant="custom" type="submit">Add Video</Button>
                        </div>
                    </div>
                }

            </Modal.Body>
        </Modal>
    );
}

export default AddVideoModal;
