import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./NavbarComponent.module.css"
import { useLocation } from 'react-router-dom';

const NavBarComponent = () => {

    const location = useLocation()
    const currentRoute = location.pathname.split('/')[1] as string

    return (
        <Nav id="navbar" navbar variant="tabs" defaultActiveKey={currentRoute} className={`${styles.navpadding} fixed-top`}>

            <Nav.Link className="center" as={NavLink} to="/dashboard" eventKey="dashboard" disabled>
                <div className={styles.home} >
                    <i className="fa-regular fa-house setcolor"></i>
                    <p className={styles.navmainname}>Home</p>
                </div>
            </Nav.Link>

            <Nav.Link className="center" as={NavLink} to="/request-service" eventKey="request-service" >
                <div className={styles.home}>
                    <i className="fa-regular fa-video setcolor"></i>
                    <p className={styles.navmainname}>Request Service</p>
                </div>
            </Nav.Link>

            <Nav.Link className="center" as={NavLink} to="/gallery" eventKey="gallery" >
                <div className={styles.home}>
                    <i className="fa-regular setcolor fa-grid-2"></i>
                    <p className={styles.navmainname}>Gallery</p>
                </div>
            </Nav.Link>

            <Nav.Link className="center" as={NavLink} to="/asset-registry" eventKey="asset-registry" >
                <div className={styles.home}>
                    <i className="fa-regular fa-folder setcolor"></i>
                    <p className={styles.navmainname}>Asset Registry</p>
                </div>
            </Nav.Link>

            <Nav.Link className="center"  as={NavLink} to="/music" eventKey="music">
                <div className={styles.home}>
                    <i className="fa-regular fa-circle-play setcolor"></i>
                    <p className={styles.navmainname}>Music</p>
                </div>
            </Nav.Link>

        </Nav>

    );
};

export default NavBarComponent;