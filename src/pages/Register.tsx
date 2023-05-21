import { FunctionComponent } from "react";
import { Button, Container, Image, Row, Col } from "react-bootstrap";
import styles from "./Register.module.css";
import RegisterForm from "../components/RegisterForm";

const Register: FunctionComponent = () => {
    return (
        <Container className={styles.login}>
            <Row>
                <Col md={3} lg={3} sm={1} className={styles.outdiv}>
                    <Image fluid className={styles.frame151} alt="" src="../left1.png" />
                </Col>
                <Col md={6} lg={6} sm={10} >
                    <RegisterForm />
                </Col>
                <Col md={3} lg={3} sm={1} className={styles.outdiv}>
                    <Image fluid className={styles.frame141} alt="" src="../right1.png" />
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
