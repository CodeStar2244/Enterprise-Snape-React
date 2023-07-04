import { FunctionComponent } from "react";
import { Button, Container, Image, Row, Col, Nav, NavItem, Ratio } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./MusicLeftBarComponent.module.css";

interface Props {
    leftBarType: string
}
const MusicLeftBarComponent = ({ leftBarType }: Props) => {
    return (
        <div className={styles.maincomponent}>
            {leftBarType}

            <Ratio aspectRatio="1x1">
                <div className={styles.coverinside}>
                </div>
            </Ratio>

            <div className={styles.detailsSection}>
                <div className={styles.titleedit}>
                    <p className={styles.sidemaintitle}>Tebogo Wedding</p>
                    <i className="fa-regular fa-ellipsis setcolor"></i>
                </div>
                <div className={styles.datepreview}>
                    <p className={styles.datesection}>
                        January 6th, 2023
                    </p>
                    <p className={styles.previewsection}>
                        15 songs
                    </p>
                </div>
            </div>


        </div>
    );
};

export default MusicLeftBarComponent;
