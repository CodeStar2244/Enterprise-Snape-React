import { FunctionComponent, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import CollectionService from "../../api/Collection/collection";
import FilesSevice from "../../api/Files/files";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";
import AddCollection from "./AddCollection";
import AddPhotosNav from "./AddPhotosNav";
import CollectionView from "./CollectionView";
import { useDispatch } from 'react-redux'
import { collectionAction } from "../../redux/actions/collectionAction";
import GalleryLoader from "../Loader/GalleryLoader";

const Collection: FunctionComponent = () => {

    const { collectionId } = useParams()
    const [loader, setLoader] = useState(true);
    const [files, setFiles]: any = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const getCollectionList = async () => {
        try {
            if (collectionId) {
                const collectionRes = await CollectionService.getCollectionById(collectionId as string)
                if (collectionRes && collectionRes?.code === STATUS_CODE.SUCCESS) {
                    dispatch(collectionAction({ collection: collectionRes.result }))
                }
                const res = await FilesSevice.getFiles(collectionId)
                if (res && res?.code === STATUS_CODE.SUCCESS) {
                    setLoader(false);
                    setFiles(res?.result)
                }
            }
        } catch (err: any) {
            if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
                setLoader(false);
                NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
                navigate('/');
            } else {
                setLoader(false);
                NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
            }
        }
    }

    useEffect(() => {
        getCollectionList();
    }, [])

    return (
        <>
            <Container fluid >
                <AddPhotosNav />
                {
                    loader ? <GalleryLoader /> :
                        files && files?.length ?
                            <CollectionView
                                collectionData={files}
                                refreshFunction={getCollectionList}
                            /> :
                            <AddCollection />
                }
            </Container>
        </>
    );
};

export default Collection;
