import { FunctionComponent, useCallback } from "react";
import styles from "./StudioManagementSide.module.css";
import $ from 'jquery';
import { Link } from "react-router-dom";

const StudioManagementSide: FunctionComponent = () => {
    const onMyDevicesClick = useCallback(() => {
        // Please sync "Add Device" to the project
    }, []);
    const hideSideBar = () => {
        $("#leftContainer").css({ left: '-100%', display: "block" })


    }

    return (
        <section className={`${styles.assetleftcontainer}`} id="leftContainer">
            <div className={styles.leftDivCancel} onClick={hideSideBar}> <i className="fa-solid fa-xl fa-xmark"></i></div>

            <div className={styles.buttoncontainres}>

                <button className={styles.leftDivButton}>
                    <i className="fa-regular fa-gear setcolor setcolorwhite"></i>
                    <Link to="for-sale">
                        <div className={styles.leftDivButtonTextWhite}>Dashboard</div>
                    </Link>
                </button>
                <button className={styles.leftDivButtonWithoutColor} onClick={onMyDevicesClick}>
                    <i className="fa-regular fa-user setcolor"></i>
                    <Link to="device-list">
                        <div className={styles.leftDivButtonText}>Clients</div>
                    </Link>
                </button>
                <button className={styles.leftDivButtonWithoutColor}>
                    <i className="fa-regular fa-file fa-rotate-180 setcolor"></i>
                    <Link to="get-cover">
                        <div className={styles.leftDivButtonText}>Documents</div>
                    </Link>
                </button>
                <button className={styles.leftDivButtonWithoutColor}>
                    <i className="fa-regular fa-calendar setcolor"></i>
                    <Link to="for-sale">
                        <div className={styles.leftDivButtonText}>Bookings</div>
                    </Link>
                </button>
                <button className={styles.leftDivButtonWithoutColor}>
                    <i className="fa-regular fa-circle-dollar setcolor"></i>
                    <Link to="for-sale">
                        <div className={styles.leftDivButtonText}>Payments</div>
                    </Link>
                </button>
                <button className={styles.leftDivButtonWithoutColor}>
                    <i className="fa-regular fa-grid-2 setcolor"></i>
                    <div className={styles.leftDivButtonText}>Templates</div>
                </button>

            </div>
        </section>
    );
};

export default StudioManagementSide;