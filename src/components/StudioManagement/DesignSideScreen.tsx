import { FunctionComponent, useEffect, useState } from "react";
import { Col, Container, Nav, Navbar } from "react-bootstrap";
import styles from "./Design.module.css"
import DisplayCollection from "./DisplayCollection";
import DisplayCover from "./DisplayCover";
import ChangeCoverModal from "../Modal/ChangeCoverModal";
import { useParams } from "react-router";
import FilesSevice from "../../api/Files/files";
import { STATUS_CODE } from "../../Utils/constants";

const activetab = {
    borderBottom: '2px solid crimson'
}

const DesignSideScreen: FunctionComponent = () => {

    useEffect(() => {
        getFiles()
    }, [])

    async function getFiles() {
        const res = await FilesSevice.getFiles(collectionId)
        if (res && res?.code === STATUS_CODE.SUCCESS) {
            setFiles(res?.result)
        }
    }


    const [active, setActive] = useState(1)
    const [modalShow, setModalShow] = useState(false);
    const [files, setFiles]: any = useState([]);
    const { collectionId } = useParams()
    return (
        <>
            <Col lg={8} md={8} sm={8} className={styles.viewpoint}>
                <div className={styles.sidemain}>
                    <>
                        <Navbar className={styles.sidenav} variant="light">
                            <Container>
                                <Nav className="me-auto">
                                    <Nav.Link
                                        className={styles.navname}
                                        style={active === 1 ? activetab : {}}
                                        onClick={() => setActive(1)}
                                    >
                                        Cover
                                    </Nav.Link>
                                    <Nav.Link
                                        className={styles.navname}
                                        style={active === 2 ? activetab : {}}
                                        onClick={() => setActive(2)}
                                    >
                                        Collection
                                    </Nav.Link>
                                </Nav>
                                <Nav className="">
                                    <Nav.Link
                                        className={styles.navname}
                                        onClick={() => setModalShow(true)}
                                    >
                                        <i className="fa-regular fa-image sidescreennav"></i>Cover
                                    </Nav.Link>
                                    <Nav.Link
                                        className={styles.navname}
                                    >
                                        <i className="fa-solid fa-circle-dot sidescreennav"></i>Focal Point
                                    </Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                        {active === 1 && <DisplayCover />}
                        {active === 2 && <DisplayCollection />}
                    </>
                </div>

            </Col>
            <ChangeCoverModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                collectionid={collectionId}
                files={files}
            />
        </>
    );
};

export default DesignSideScreen;
