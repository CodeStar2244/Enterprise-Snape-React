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

const AssetLeftContainer: FunctionComponent<any> = (props) => {

  const hideSideBar = () => {
    $("#leftContainer").css({ left: '-100%', display: "block" })
  }

  const buttonData: any[] = props.buttonData || [];
  const [active, setActive] = useState(1);

  return (
    <section className={`${styles.assetleftcontainer}`} id="leftContainer">
      <div className={styles.leftDivCancel} onClick={hideSideBar}> <i className="fa-solid fa-xl fa-xmark"></i></div>

      <div className={styles.buttoncontainres}>
        {buttonData.map((button: any, index: number) => (
          <Link to={button.to} className={styles.btndiv} key={button.id}>
            <button
              className={styles.leftDivButtonWithoutColor}
              onClick={() => setActive(index + 1)}
              style={active === index + 1 ? activeStyle : {}}
            >
              {active === index + 1 ? (
                <i className={button.iconActive}></i>
              ) : (
                <i className={button.iconInactive}></i>
              )}
              <div className={styles.leftDivButtonText} style={active === index + 1 ? activeText : {}}>
                {button.text}
              </div>
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AssetLeftContainer;