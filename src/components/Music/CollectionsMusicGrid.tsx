import { FunctionComponent } from "react";
import { Row} from "react-bootstrap";
import styles from "./MusicGrid.module.css";
import MusicGridCard from "./MusicGridCard";


const MusicCollectionGrid: FunctionComponent = () => {
    return (
        <div className={styles.musicGridMain}>
        <div className={styles.collectionCount}><p>2 Collections</p></div>
        <Row className={styles.maincomp}>
           <MusicGridCard/>
           <MusicGridCard/>
        </Row>
        </div>
    );
};

export default MusicCollectionGrid;
