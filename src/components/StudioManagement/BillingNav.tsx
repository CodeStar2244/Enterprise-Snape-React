import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./BillingNav.module.css"

const BillingNav: any = () => {


    return (
        <Nav id="navbar" navbar variant="tabs" defaultActiveKey="studiomanagement" className={`${styles.navpadding}`}>
            <Nav.Link as={NavLink} to="/dashboard" eventKey="dashboard">
                <div className={styles.home} >
                    <p>Branding</p>
                </div>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/gallery" eventKey="gallery" >
                <div className={styles.home}>
                    <p>Profile</p>
                </div>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/studiomanagement/billing" eventKey="studiomanagement">
                <div className={styles.home}>
                    <p>Billing</p>
                </div>
            </Nav.Link>
        </Nav>
    );
};

export default BillingNav;