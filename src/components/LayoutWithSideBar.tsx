import { Container, Row, Col } from "react-bootstrap";
import StudioSideBar from "./StudioSideBar";
import styles from "./Layout.module.css"
import { Outlet } from "react-router-dom";

interface Props {
    children: JSX.Element;
}

const LayoutWithSideBar = () => {
    return (
        <div className={styles.maincomp}>
            <Container fluid >
                <Row>
                    <Col lg={2} md={3} sm={3}>
                        <StudioSideBar />
                    </Col>
                    <Col lg={10} md={9} sm={9}>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LayoutWithSideBar;
