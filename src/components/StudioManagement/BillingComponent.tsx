import { FunctionComponent, useState } from "react";
import { Col, Image, Ratio, Row } from "react-bootstrap";
import AddNewDeviceModal from "../Modal/AddNewDeviceModal";
import styles from "./Billing.module.css";
import BillingNav from "./BillingNav";

const activeCard = {
    color: "white",
    backgroundColor: "#EC1A25"
}

const activeBtn = {
    color: "black",
    backgroundColor: "white",
}


const BillingComponent: any = () => {

    async function handleClick(divno: any) {
        setActive(divno)
    }
    const [active, setActive] = useState(1)

    return (
        <div className={styles.maindiv}>
            <div className={styles.navbarcover}>
                <div className={styles.navtitle}>
                    Settings
                </div>
            </div>
            <BillingNav />
            <div className={styles.allcards}>
                <Row>
                    <Col sm={12} md={4} lg={3}>
                        <Ratio
                            aspectRatio="1x1"
                            className={styles.maincard}
                            style={active === 1 ? activeCard : {}}
                            onClick={() => handleClick(1)}
                        >
                            <div className={styles.singlecard}>
                                <div className={styles.title}>
                                    Just To Get You Started
                                </div>
                                <div className={styles.subtitle}>Free</div>
                                <div className={styles.subtitle}>Forever</div>
                                <div className={styles.imgsvg}>
                                    <div className={styles.points}>R 0</div>
                                    <ul className={styles.optionlist}>
                                        <li className={styles.points}>3GB Storage</li>
                                        <li className={styles.points}>No Royalty Music</li>
                                        <li className={styles.points}>No Video Uploads</li>
                                    </ul>
                                </div>
                                <div className={styles.btndiv}>
                                    <button
                                        className={styles.addNewDevicebtn}
                                        style={active === 1 ? activeBtn : {}}
                                    >
                                        I Just Arrived
                                    </button>
                                </div>
                            </div>
                        </Ratio>
                    </Col>
                    <Col sm={12} md={4} lg={3}>
                        <Ratio
                            aspectRatio="1x1"
                            className={styles.maincard}
                            style={active === 2 ? activeCard : {}}
                            onClick={() => handleClick(2)}
                        >
                            <div className={styles.singlecard}>
                                <div className={styles.title}>
                                    Okay We See You
                                </div>
                                <div className={styles.subtitle}>Starter</div>
                                <div className={styles.subtitle}>Package</div>
                                <div className={styles.imgsvg}>
                                    <div className={styles.points}>R 250 p/m</div>
                                    <ul className={styles.optionlist}>
                                        <li className={styles.points}>100GB Storage</li>
                                        <li className={styles.points}>Royalty Music</li>
                                    </ul>
                                </div>
                                <div className={styles.btndiv}>
                                    <button
                                        className={styles.addNewDevicebtn}
                                        style={active === 2 ? activeBtn : {}}
                                    >
                                        Start Rolling
                                    </button>
                                </div>
                            </div>
                        </Ratio>
                    </Col>
                    <Col sm={12} md={4} lg={3}>
                        <Ratio
                            aspectRatio="1x1"
                            className={styles.maincard}
                            style={active === 3 ? activeCard : {}}
                            onClick={() => handleClick(3)}
                        >
                            <div className={styles.singlecard}>
                                <div className={styles.title}>
                                    Things Are Getting Serious
                                </div>
                                <div className={styles.subtitle}>Professional</div>
                                <div className={styles.subtitle}>Hustler</div>
                                <div className={styles.imgsvg}>
                                    <div className={styles.points}>R 699 p/m</div>
                                    <ul className={styles.optionlist}>
                                        <li className={styles.points}>500GB Storage</li>
                                        <li className={styles.points}>Royalty Music</li>
                                    </ul>
                                </div>
                                <div className={styles.btndiv}>
                                    <button
                                        className={styles.addNewDevicebtn}
                                        style={active === 3 ? activeBtn : {}}
                                    >
                                        Start Rolling
                                    </button>
                                </div>
                            </div>
                        </Ratio>
                    </Col>
                    <Col sm={12} md={4} lg={3}>
                        <Ratio
                            aspectRatio="1x1"
                            className={styles.maincard}
                            style={active === 4 ? activeCard : {}}
                            onClick={() => handleClick(4)}
                        >
                            <div className={styles.singlecard}>
                                <div className={styles.title}>
                                    The Boss Has Arrived
                                </div>
                                <div className={styles.subtitle}>Elite</div>
                                <div className={styles.subtitle}>Hustler</div>
                                <div className={styles.imgsvg}>
                                    <div className={styles.points}>R 1099 p/m</div>
                                    <ul className={styles.optionlist}>
                                        <li className={styles.points}>1TB Storage</li>
                                        <li className={styles.points}>Royalty Music</li>
                                    </ul>
                                </div>
                                <div className={styles.btndiv}>
                                    <button
                                        className={styles.addNewDevicebtn}
                                        style={active === 4 ? activeBtn : {}}
                                    >
                                        Start Rolling
                                    </button>
                                </div>
                            </div>
                        </Ratio>
                    </Col>
                </Row>
            </div>
            <div className={styles.buystorage}>
                <Row>
                    <div className={styles.storagetitle}>
                        Buy Storage Only
                    </div>
                    <Col sm={12} md={3} lg={3}>
                        <button className={styles.buystoragebtn} style={{ color: "white", backgroundColor: "black" }}>
                            Buy More Storage
                        </button>
                    </Col>
                    <Col sm={12} md={3} lg={3}>
                        <button className={styles.buystoragebtn} style={{ color: "black", backgroundColor: "#E7E5E5" }}>
                            10GB
                        </button>
                    </Col>
                    <Col sm={12} md={3} lg={3}>
                        <button className={styles.buystoragebtn} style={{ color: "black", backgroundColor: "#E7E5E5" }}>
                            R10
                        </button>
                    </Col>
                    <Col sm={12} md={3} lg={3}>
                        <button className={styles.buystoragebtn} >
                            Purchase
                        </button>
                    </Col>
                </Row>
            </div>

        </div>
    );
};


export default BillingComponent;