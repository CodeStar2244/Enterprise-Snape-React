import { FunctionComponent } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AddCollection.module.css";
import { useParams } from "react-router-dom";

const AddCollection: FunctionComponent = () => {

    const { collectionId } = useParams()

    return (
        <>
            <div className={styles.outermain}>
                <div className={styles.addmedia}>
                    <p className={styles.nomedia}>
                        You have no media here
                    </p>
                    <Link to={`/gallery/addcollection/${collectionId}`} >
                        <Button className={styles.dragbtn} variant="custom">Add Media</Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AddCollection;
