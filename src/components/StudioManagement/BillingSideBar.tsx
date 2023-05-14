import { FunctionComponent, useCallback } from "react";
import styles from "./StudioManagementSide.module.css";
import $ from 'jquery';
import { Link } from "react-router-dom";

const BillingSideBar: FunctionComponent = () => {
    const onMyDevicesClick = useCallback(() => {
        // Please sync "Add Device" to the project
    }, []);
    const hideSideBar = () => {
        $("#leftContainer").css({ left: '-100%', display: "block" })


    }

    return (
        <section className={`${styles.assetleftcontainer}`} id="leftContainer">
            <div className={styles.leftDivCancel} onClick={hideSideBar}> <i className="fa-solid fa-xl fa-xmark"></i></div>

        </section>
    );
};

export default BillingSideBar;