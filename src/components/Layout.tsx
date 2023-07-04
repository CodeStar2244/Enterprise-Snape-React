import { FunctionComponent } from "react";
import { Button, Container, Image, Row, Col, Nav, NavItem } from "react-bootstrap";
import NavBarComponent from "./NavbarComponent";
import TopBarComponent from "./TopBarComponent";
import styles from "./Layout.module.css"

interface Props {
    children: JSX.Element;
}

const Layout = ({ children }: Props) => {
    return (
        <div className={styles.maincomp}>
            <Container fluid>
                {children}
            </Container>
        </div>
    );
};

export default Layout;
