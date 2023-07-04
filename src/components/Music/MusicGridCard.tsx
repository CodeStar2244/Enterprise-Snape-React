import { Button, Container, Image, Row, Col, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./MusicGrid.module.css";
const MusicGridCard = () => {
  return (
    <Col xl={3} lg={4} sm={6} className={styles.gridCardComp} >
                <div className={styles.imgblock}>
                    <div className={styles.imgdiv}>
                        <Link to="1">
                        <Image  className={styles.myimage} src="../../../sample2.jpg" />
                        </Link>
                    </div>
                    <div className={styles.outertitle}>
                        <p className={styles.title}>Tebogo Wedding</p>
                        <i className="fa-regular fa-ellipsis setcolor galleryicon"></i>
                    </div>
                    <div className={styles.outerdetails}>
                        <p className={styles.details}>January 6th,2023</p>
                        <p className={styles.details}>15 songs</p>
                    </div>
                </div>
            </Col>
  )
}

export default MusicGridCard