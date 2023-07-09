import { FunctionComponent } from "react";
import { Button, Container, Image, Row, Col, Nav, NavItem } from "react-bootstrap";
import NavBarComponent from "./NavbarComponent";
import TopBarComponent from "./TopBarComponent";
import styles from "./Layout.module.css"

interface Props {
    children: JSX.Element;
}

const Grid1 = () => {
    return (
        <div className={styles.maincomp}>
            <Container fluid>
                <Row lg="auto" className={styles.imgset}>
                    <Col>
                        <Image className={styles.singleimage} src="../../images12.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../images11.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../sample2.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../images15.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../images16.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../images13.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../images11.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../sample2.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../images15.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../images16.jpg" />
                    </Col>
                    <Col>
                        <Image className={styles.singleimage} src="../../images13.jpg" />
                    </Col>
                    {/* 
                    <Image className={styles.singleimage} src="../../sample2.jpg" />
                    <Image className={styles.singleimage} src="../../images12.jpg" />
                    <Image className={styles.singleimage} src="../../images13.jpg" />
                    <Image className={styles.singleimage} src="../../images13.jpg" />
                    <Image className={styles.singleimage} src="../../images14.jpg" />
                    <Image className={styles.singleimage} src="../../images15.jpg" />
                    <Image className={styles.singleimage} src="../../images16.jpg" />
                    <Image className={styles.singleimage} src="../../images11.jpg" />
                    <Image className={styles.singleimage} src="../../images15.jpg" />
                    <Image className={styles.singleimage} src="../../images14.jpg" />
                    <Image className={styles.singleimage} src="../../images16.jpg" />
                    <Image className={styles.singleimage} src="../../images16.jpg" />
                    <Image className={styles.singleimage} src="../../images14.jpg" />
                    <Image className={styles.singleimage} src="../../images15.jpg" />
                    <Image className={styles.singleimage} src="../../images12.jpg" /> */}
                </Row>
            </Container>
        </div>
    );
};

export default Grid1;
