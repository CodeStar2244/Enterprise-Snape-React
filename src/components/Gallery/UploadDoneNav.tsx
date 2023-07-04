import { FunctionComponent } from "react";
import { Button, Container, Navbar, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import styles from "./UploadNavDone.module.css";
import { useParams, redirect } from "react-router-dom";

const UploadDoneNav = (props: any) => {

    const { collectionId } = useParams()

    const handleClick = () => {
        props.handleSetChange()
    }

    return (
        <Navbar className={styles.maincomp}>
            <Container fluid className={styles.galleryaddnav}>
                <Navbar.Brand className={styles.mainname}>Add Photos to Highlights</Navbar.Brand>
                <Form className={styles.btnsetting}>
                    <div className={styles.widthset} onClick={handleClick}>
                        <Button className={styles.collectionbtn} variant="custom">Upload More</Button>
                    </div>
                    <Link to={`/gallery/collection/${collectionId}`}>
                        <Button className={styles.collectionbtn} variant="custom">Manage Collection</Button>
                    </Link>
                </Form>
            </Container>
        </Navbar>
    );
};

export default UploadDoneNav;
