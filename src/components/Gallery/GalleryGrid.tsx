import { FunctionComponent, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CollectionService from "../../api/Collection/collection";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../../Utils/constants";
import { NotificationWithIcon } from "../../Utils/helper";
import styles from "./GalleryGrid.module.css";
import GalleryGridCard from "./GalleryGridCard";
import GalleryNav from "./GalleryNav";
import CollectionLoader from "../Loader/CollectionLoader";

const GalleryGrid: FunctionComponent = () => {

    const [loader, setLoader] = useState<boolean>(true);
    const [collection, setCollection] = useState([]);
    const navigate = useNavigate();

    const getCollectionList = async () => {
        try {
            const res = await CollectionService.getCollection()
            if (res && res?.code === STATUS_CODE.SUCCESS) {
                setCollection(res?.result)
                setLoader(false);
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
            <GalleryNav setCollectionSort={setCollection} setLoaderSort={setLoader} />
            <div className={styles.collectioncount}>
                <p className={styles.collectioncountdis}>
                    {collection.length} collections
                </p>
            </div>
            {loader ?
                <CollectionLoader /> :
                <Row className={styles.maincomp}>
                    {
                        collection && collection.length ? collection.map((singleCollection: any) => (
                            <GalleryGridCard
                                collectionData={singleCollection}
                                refreshFunction={getCollectionList}
                                key={singleCollection?.id}
                            />
                        )) :
                            <div className={styles.nocollection}>
                                No collection found
                            </div>
                    }

                </Row>
            }
        </>
    );
};

export default GalleryGrid;
