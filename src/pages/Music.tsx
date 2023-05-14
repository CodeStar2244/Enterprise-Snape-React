import { FunctionComponent } from "react";
import { Button, Col, Container, Nav, Navbar, NavDropdown, Offcanvas, Row } from "react-bootstrap";
import Layout from "../components/Layout";
import AllMusic from "../components/Music/AllMusic";
import MusicNav from "../components/Music/MusicNav";
import MusicSideComp from "../components/Music/MusicSideComp";
import styles from "./Music.module.css"

const Music: FunctionComponent = () => {
    return (
        <Layout>
            <>
                <Row>
                    <Col md={3} lg={3} >
                        <MusicSideComp />
                    </Col>
                    <Col md={9} lg={9} >
                        <MusicNav />
                        <AllMusic />
                    </Col>
                </Row>
            </>
        </Layout >
    );
};

export default Music;
