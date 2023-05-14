import { FunctionComponent, useState } from "react";
import { Image, Ratio } from "react-bootstrap";
import AddNewDeviceModal from "../Modal/AddNewDeviceModal";
import styles from "./StudioDashboard.module.css";


const activeCard = {
    color: "white",
    backgroundColor: "#EC1A25"
}

const activeBtn = {
    color: "black",
    backgroundColor: "white",
}


const StudioDashBoard: any = () => {

    async function handleClick(divno: any) {
        setActive(divno)
    }
    const [active, setActive] = useState(1)

    return (
        <div className={styles.maindiv}>
            <div className={styles.navbarcover}>
                <div className={styles.navtitle}>
                    Studio Management- Coming Soon
                </div>
            </div>
            <div  className={styles.createDiv}>
            <div>
                <h6>Create</h6>
                <div className={styles.createBtnDiv}>
                    <div className={styles.buttons}><i className="fa-regular fa-plus fa-xl setcolorwithoutmargin"></i> Invoice</div>
                    <div className={styles.buttons}><i className="fa-regular fa-plus fa-xl setcolorwithoutmargin"></i> Quotation</div>
                    <div className={styles.buttons}><i className="fa-regular fa-plus fa-xl setcolorwithoutmargin"></i> Contract</div>
                    <div className={styles.buttons}><i className="fa-regular fa-plus fa-xl setcolorwithoutmargin"></i> Questionnaire</div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default StudioDashBoard;