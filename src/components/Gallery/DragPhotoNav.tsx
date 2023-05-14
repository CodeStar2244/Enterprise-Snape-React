import { FunctionComponent } from "react";
import { Button, Container, Navbar, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import styles from "./AddPhotosNav.module.css";


const DagPhotoNav: FunctionComponent = () => {
    const { collectionId } = useParams()
    return (
        <Navbar className={styles.maincomp}>
            <Container fluid>
                <Navbar.Brand className={styles.mainname}>Add Photos to Highlights</Navbar.Brand>
                <Form className="d-flex">
                    <Link to={`/gallery/collection/${collectionId}`}>
                        <Button className={styles.collectionbtn} variant="custom">Cancel</Button>
                    </Link>
                </Form>
            </Container>
        </Navbar>
    );
};

export default DagPhotoNav;
