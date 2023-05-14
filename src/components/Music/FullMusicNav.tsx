import { FunctionComponent } from "react";
import { Button, Container, Form, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./FullMusicNav.module.css";


interface Props {
    navTitle : string
}

const FullMusicNav = ({navTitle}:Props) => {
    return (
        <>
            <div className={styles.maincomp}>
                <p className={styles.navTitle}>{navTitle}</p>
                <Form className={styles.musicNavForm}>
                    <Form.Control
                        type="search"
                        placeholder="Search Music"
                        // placeholder="&#61442;"
                        className={styles.mainLoginInput}
                        aria-label="Search"
                    />
                    <Button variant="custom" className={styles.navbtnsort}>
                        <div className={styles.navname}>Sort By</div>
                        <i className="fa-regular musicnavset fa-arrow-right-arrow-left"></i>
                    </Button>
                    <Link to="/music/downloads" className={styles.navbtndown}>
                    <Button variant="custom" className={styles.navbtndown}>
                        <div className={styles.navname}>Downloads</div>
                        <i className="fa-regular musicnavset fa-arrow-down-to-line"></i>
                    </Button>
                    </Link>
                    <Link to="/music/collections" className={styles.navbtncollection}>
                    <Button variant="custom" className={styles.navbtncollection}>
                        <div className={styles.navname}>Collections</div>
                        <i className="fa-regular musicnavset fa-pen-to-square"></i>
                    </Button>
                    </Link>
                </Form>
            </div>
        </>
    );
};

export default FullMusicNav;
