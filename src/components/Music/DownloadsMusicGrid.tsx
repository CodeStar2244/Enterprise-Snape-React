import { FunctionComponent } from "react";
import { Row} from "react-bootstrap";
import styles from "./MusicGrid.module.css";
import MusicGridCard from "./MusicGridCard";


const MusicDownloadsGrid: FunctionComponent = () => {
    return (
        <div className={styles.musicGridMain}>
        <div className={styles.collectionCount}><p>4 Collections</p></div>
        <Row className={styles.maincomp}>
           <MusicGridCard/>
           <MusicGridCard/>
           <MusicGridCard/>
           <MusicGridCard/>
           <MusicGridCard/>
        </Row>
        </div>
    );
};

export default MusicDownloadsGrid;
