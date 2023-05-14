import { useState } from "react";
import { Image, Col, Ratio, NavDropdown } from "react-bootstrap";
import CreateCollectionModal from "../Modal/CreateCollectionModal";
import { useNavigate } from "react-router-dom";
import styles from "./GalleryGrid.module.css";
import Moment from "react-moment";
import 'moment-timezone';
import { useDispatch } from 'react-redux'
import { collectionAction } from "../../redux/actions/collectionAction";
import DeleteConfirmation from "../Modal/DeleteConfirmation";
import CollectionService from "../../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";

const  GalleryGridCard = ({ collectionData, refreshFunction }: any) => {

    const [collection, setCollection] = useState({
        name: collectionData?.name || "",
        eventDate: collectionData?.eventDate || ""
    })
    const dispatch = useDispatch()

    const onSubmit = (data: any) => {
        setCollection(data)
    }

    const [modalShow, setModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);

    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(collectionAction({ collection: collectionData }))
        navigate(`/gallery/collection/${collectionData?.id}`)
    }
    const deleteCollection = async () => {
        try {
            if (collectionData?.id) {
                const deleteRes = await CollectionService.deleteCollection(collectionData?.id)
                if (deleteRes && deleteRes?.code === STATUS_CODE.SUCCESS) {
                    refreshFunction()
                    setModalShow(false);
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

    return (
        <Col xl={3} lg={4} sm={6} className={styles.imgblock1} >
            <div className={styles.imgblock}>
                <Ratio aspectRatio='16x9' onClick={handleClick} className={styles.imgdivpoint}>
                    <Image className={styles.myimage} src={collectionData.coverPhoto} />
                </Ratio>
                <div className={styles.outertitle}>
                    <p className={styles.title}>{collection.name}</p>
                    <NavDropdown
                        align="end"
                        title={<i className="fa-regular fa-ellipsis setcolorgallery galleryicon"></i>}
                        className={styles.navdropdown} id="collasible-nav-dropdown gallerydropdown">
                        <NavDropdown.Item onClick={() => setModalShow(true)} >
                            <div className={styles.navicons}>
                                <i className="fa-sharp fa-regular navicons fa-pencil"></i>
                                <div className={styles.navtags}>Quick Edit</div>
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item >
                            <div className={styles.navicons}>
                                <i className="fa-solid navicons fa-link"></i>
                                <div className={styles.navtags}>Get Direct Link</div>
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setDeleteModalShow(true)}>
                            <div className={styles.navicons}>
                                <i className="fa-solid navicons fa-trash-can"></i>
                                <div className={styles.navtags}>Delete Collection</div>
                            </div>
                        </NavDropdown.Item>
                    </NavDropdown>
                </div>
                <div className={styles.outerdetails}>
                    <p className={styles.details}>
                        <Moment format="MMMM  Do, YYYY">{collection.eventDate}</Moment>
                    </p>
                    <p className={styles.details}>{collectionData?.photos} Photos</p>
                    <p className={styles.details}>{collectionData?.videos} Videos</p>
                    <p className={styles.details}>{
                        collectionData && collectionData?.status === "HIDDEN" ? "Hidden" : "Published"
                    }</p>
                </div>
            </div>
            <CreateCollectionModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                createnew="false"
                id={collectionData.id}
                name={collection.name}
                eventdate={collection.eventDate}
                onSubmit={onSubmit}
            />
            <DeleteConfirmation
                show={deleteModalShow}
                modaltext={"Are you sure want to delete collection?"}
                onHide={() => setDeleteModalShow(false)}
                handledeletefiles={deleteCollection as any}
            />
        </Col>
    )
}

export default GalleryGridCard