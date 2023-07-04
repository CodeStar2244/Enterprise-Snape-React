import { width } from "@mui/system";
import { FunctionComponent } from "react";
import { Button, Col, Container, Dropdown, Form, FormLabel, Image, InputGroup, Nav, Navbar, Row } from "react-bootstrap";
import CustomDropdownItem from "./CustomDropdownItem";
import { useSelector, useDispatch } from 'react-redux'
import styles from "./Design.module.css"
import Moment from "react-moment";

const DisplayCover: FunctionComponent = () => {

    const myState = useSelector((state: any) => state.changeDesign)
    const myCollection = useSelector((state: any) => state.changeCollection)
    const collection = myCollection.collection

    return (
        <>
            <div className={styles.sample}>
                <div
                    className={styles.pcscreen}
                    style={{
                        backgroundImage: `url(${collection?.coverPhoto})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                >
                    <div>
                        <p
                            className={styles.maintitle}
                            style={myState.coverstyle}
                        >
                            {collection?.name}
                        </p>
                        <p
                            className={styles.maindate}
                            style={myState.coverstyle}
                        >
                            <Moment format="MMMM  Do, YYYY">{collection?.eventDate}</Moment>
                        </p>
                    </div>
                </div>
                <div
                    className={styles.mobilescreen}
                    style={{
                        backgroundImage: `url(${collection?.coverPhoto})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                    }}
                >
                    <div className={styles.mobiletitlediv}>
                        <p
                            className={styles.maintitlemobile}
                            style={myState.coverstyle}
                        >
                            {collection?.name}
                        </p>
                        <p
                            className={styles.maindatemobile}
                            style={myState.coverstyle}
                        >
                            <Moment format="MMMM  Do, YYYY">{collection?.eventDate}</Moment>
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default DisplayCover;
