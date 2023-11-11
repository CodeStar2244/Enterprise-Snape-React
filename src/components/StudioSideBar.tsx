import { FunctionComponent, useEffect } from "react";
import { useState } from "react";
import { Image, Nav, Ratio } from "react-bootstrap";
import Moment from "react-moment";
import { Link, useNavigate, useParams ,NavLink} from "react-router-dom";
import CollectionService from "../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../Utils/constants";
import { NotificationWithIcon } from "../Utils/helper";
import CreateCollectionModal from "./Modal/CreateCollectionModal";
import GetDirectLinkModal from "./Modal/GetDirectLinkModal";
import styles from "./StudioSideBar.module.css";
import { useSelector, useDispatch } from 'react-redux'
import { collectionAction } from "../redux/actions/collectionAction";
import PublishCollectionModal from "./Modal/PublishCollectionModal";
import Constants from "../Config/Constants";

const StudioSideBar: FunctionComponent = () => {
    const [modalShow, setModalShow] = useState(false);
    const [getLinkModalShow, setGetLinkModalShow] = useState(false);
    const [publishCollectionModal, setPublishCollectionModal] = useState(false);
    const { collectionId } = useParams()
    const [collection, setCollection]: any = useState([]);
    const navigate = useNavigate();
    const myState = useSelector((state: any) => state.changeCollection)
    const dispatch = useDispatch()

    const handleChangeClick = () => {
        navigate(`/gallery/design/${collectionId}`)
    }

    const publishCollection = async () => {
        try {
            if (collectionId) {
                const res = await CollectionService.updateCollection(collectionId as string, { status: "PUBLISH" })
                if (res && res?.code === STATUS_CODE.SUCCESS) {
                    NotificationWithIcon("success", "Your collection has been published.")
                    setCollection(res?.result)
                    dispatch(collectionAction({ collection: res.result }))
                    setPublishCollectionModal(false)
                }
            }
        } catch (error) {
            console.log("error", error)
            NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
        }
    }

    const setPreview = () => {
        const clientUrl = Constants.clientViewUrl + collection.url
    }

    const getCollectionList = async () => {
        try {
            if (collectionId) {
                const res = myState.collection
                if (Object.keys(res).length !== 0) {
                    setCollection(res)
                } else {
                    const res = await CollectionService.getCollectionById(collectionId as string)
                    if (res && res?.code === STATUS_CODE.SUCCESS) {
                        setCollection(res?.result)
                        dispatch(collectionAction({ collection: res.result }))
                    }
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

    const onSubmit = (data: any) => {
        setCollection({ ...collection, data })
    }

    useEffect(() => {
        getCollectionList();
    }, [myState])

    return (
        <div className={styles.maincomponent}>
            <div className={styles.titleedit}>
                <p className={styles.sidemaintitle}>{collection.name}</p>
                <i className="fa-regular fa-pen sidebaricon" onClick={() => setModalShow(true)}></i>
            </div>
            <div className={styles.datepreview}>
                <p className={styles.datesection}>
                    <Moment format="MMMM  Do, YYYY">{collection.eventDate}</Moment>
                </p>
                <p className={styles.previewsection}>
                    Preview
                </p>
            </div>
            <div className={styles.covermain}>
                <div className={styles.coverinside1}>
                    <Ratio aspectRatio='16x9'>
                        <div>
                            <Image className={styles.myimage} src={collection.coverPhoto} />
                            <div className={styles.textimage} onClick={handleChangeClick}>
                                <i className="fa-solid sidebarselecticon fa-image"></i> Change Cover
                            </div>
                        </div>
                    </Ratio>
                </div>
            </div>
            <div className={styles.settingtab} id="sidebar-nav">
                <Nav variant="tabs"  defaultActiveKey="image" >
                <Nav.Link as={NavLink}  eventKey="image"  to = {`/gallery/collection/${collectionId}`} className={styles.settingbtn}>
                    <i className="fa-light setcolorsidesettingset fa-image"></i>
                </Nav.Link>
                <Nav.Link as={NavLink}  eventKey="setting" to = {`/gallery/collection-setting/${collectionId}`} className={styles.settingbtn}>
                    <i className="fa-light setcolorsidesettingset fa-gear"></i>
                </Nav.Link>
                </Nav>
            </div>
            <p className={styles.settings}>Settings</p>
            <Nav defaultActiveKey="/home" className="flex-column">
                <button className={styles.navbutton}>
                    <Link to={`/gallery/collection-setting/${collectionId}`}>
                        <i className="fa-regular setcolorsidesetting fa-ellipsis-vertical"></i>
                        <p className={styles.settingname}> Collection Settings</p>
                    </Link>
                </button>
                <button className={styles.navbutton}>
                    <Link to={`/gallery/design/${collectionId}`}>
                        <i className="fa-regular setcolorsidesetting fa-pen-to-square"></i>
                        <p className={styles.settingname}> Design</p>
                    </Link>
                </button>
                <button className={styles.navbutton}>
                    <Link to={`/gallery/privacy/${collectionId}`}>
                        <i className="fa-regular setcolorsidesetting fa-lock-keyhole"></i>
                        <p className={styles.settingname}> Privacy</p>
                    </Link>
                </button>
                <button className={styles.navbutton}>
                    <Link to={`/gallery/download/${collectionId}`}>
                        <i className="fa-sharp setcolorsidesetting fa-regular fa-arrow-down-to-line"></i>
                        <p className={styles.settingname}> Download</p>
                    </Link>
                </button>
            </Nav>
            <div>
                <p className={styles.datepreview}>
                    {
                        collection.status === "PUBLISH" ?
                            <>
                                <button className={styles.previewbtn} >
                                    <a className={styles.prreviewbtnset} href={Constants.clientViewUrl + collection.url} target="_blank">
                                        View
                                    </a>
                                </button>
                                <button className={styles.publishbtn} onClick={() => setGetLinkModalShow(true)}>Share</button>
                            </> :
                            <>
                                <button className={styles.previewbtn} >
                                    <a className={styles.prreviewbtnset} href={Constants.clientViewUrl + collection.url} target="_blank">
                                        Preview
                                    </a>
                                </button>
                                <button className={styles.publishbtn} onClick={() => setPublishCollectionModal(true)}>Publish</button>
                            </>
                    }
                    {/* <button className={styles.publishbtn} onClick={() => setGetLinkModalShow(true)}>View</button> */}
                </p>
            </div>
            <CreateCollectionModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                createnew="false"
                id={collection.id}
                name={collection.name}
                eventdate={collection.eventDate}
                onSubmit={onSubmit}
            />
            <PublishCollectionModal
                show={publishCollectionModal}
                onHide={() => setPublishCollectionModal(false)}
                publishcollection={publishCollection}
                id={collection.id}
            />
            <GetDirectLinkModal
                show={getLinkModalShow}
                collection={myState} onHide={() => setGetLinkModalShow(false)} />
        </div>
    );
};

export default StudioSideBar;
