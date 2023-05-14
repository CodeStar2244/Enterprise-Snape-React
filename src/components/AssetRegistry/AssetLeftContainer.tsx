import { FunctionComponent, useCallback, useState } from "react";
import styles from "./AssetLeftContainer.module.css";
import $ from 'jquery';
import { Link } from "react-router-dom";

const activeStyle = {
  backgroundColor: "var(--color-crimson)",
  color: "white"
}

const activeText = {
  color: "white"
}

const AssetLeftContainer: FunctionComponent = () => {

  const hideSideBar = () => {
    $("#leftContainer").css({ left: '-100%', display: "block" })
  }

  async function handleClick(number: any) {
    setActive(number)
  }

  const [active, setActive] = useState(1)

  return (
    <section className={`${styles.assetleftcontainer}`} id="leftContainer">
      <div className={styles.leftDivCancel} onClick={hideSideBar}> <i className="fa-solid fa-xl fa-xmark"></i></div>

      <div className={styles.buttoncontainres}>

        <Link to="" className={styles.btndiv}>
          <button
            className={styles.leftDivButtonWithoutColor}
            onClick={() => { handleClick(1) }}
            style={active === 1 ? activeStyle : {}}
          >
            {
              active === 1 ? <i className="fa-regular fa-house setsizeasset"></i> :
                <i className="fa-regular fa-house setcolor"></i>
            }
            <div className={styles.leftDivButtonText} style={active === 1 ? activeText : {}}>Dashboard</div>

          </button>
        </Link>

        <Link to="device-list" className={styles.btndiv}>
          <button
            className={styles.leftDivButtonWithoutColor}
            onClick={() => { handleClick(2) }}
            style={active === 2 ? activeStyle : {}}
          >
            {
              active === 2 ? <i className="fa-light fa-envelope setsizeasset"></i> :
                <i className="fa-light fa-envelope setcolor"></i>
            }
            <div className={styles.leftDivButtonText} style={active === 2 ? activeText : {}}>My Devices</div>
          </button>
        </Link>

        <Link to="get-cover" className={styles.btndiv}>
          <button
            className={styles.leftDivButtonWithoutColor}
            onClick={() => { handleClick(3) }}
            style={active === 3 ? activeStyle : {}}
          >
            {
              active === 3 ? <i className="fa-regular fa-user setsizeasset"></i> :
                <i className="fa-regular fa-user setcolor"></i>
            }
            <div className={styles.leftDivButtonText} style={active === 3 ? activeText : {}}>Get Cover</div>
          </button>
        </Link>
        <Link to="for-sale" className={styles.btndiv}>
          <button
            className={styles.leftDivButtonWithoutColor}
            onClick={() => { handleClick(4) }}
            style={active === 4 ? activeStyle : {}}
          >
            {
              active === 4 ?
                <i className="fa-regular fa-circle-dollar setsizeasset"></i> :
                <i className="fa-regular fa-circle-dollar setcolor"></i>
            }

            <div className={styles.leftDivButtonText} style={active === 4 ? activeText : {}}>Products For Sale</div>
          </button>
        </Link>
        <Link to="for-rent" className={styles.btndiv}>
          <button
            className={styles.leftDivButtonWithoutColor}
            onClick={() => { handleClick(5) }}
            style={active === 5 ? activeStyle : {}}
          >
            {
              active === 5 ?
                <i className="fa-regular fa-grid-2 setsizeasset"></i> :
                <i className="fa-regular fa-grid-2 setcolor"></i>
            }
            <div className={styles.leftDivButtonText} style={active === 5 ? activeText : {}}>Products For Rent</div>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AssetLeftContainer;