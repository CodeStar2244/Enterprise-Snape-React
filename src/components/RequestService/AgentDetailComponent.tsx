import { useParams } from "react-router-dom";
import styles from "./AgentDetailStyle.module.css";
import { useState } from "react";
import AgentGalleryComponent from "./Childs/AgentGalleryComponent";
import AgentIntroComponent from "./Childs/AgentIntroComponent";

const AgentDetailComponent: any = () => {
  const { id } = useParams();

  const data = {
    id: 1,
    profileImage: "./temp/profile.png",
    backgroundImage: "./temp/background.png",
    userName: "User 1",
    profession: "Developer",
    cost: 1001,
    joinedDate: "20 March 2023",
    projectsCount: 57,
    experienceLevel: "Mid-level",
    isFavourite: true,
  };

  const onBook = () => {
    console.log("book", data);
  };

  const [selectedTab, setSelectedTab] = useState(1);

  console.log(id, "agentid");
  return (
    <div className={styles.container}>
      <div className="d-flex pb-2">
        <div className={styles.goBack}>
          <i className="fa-regular fa-angle-left"></i>
        </div>
        <div className={`center ${styles.userDataTop}`}>
          <div className={styles.username}>Angelina Jully</div>
          <div className={styles.userType}>Photographer</div>
        </div>
      </div>
      <div className="top-section">
        <div className={styles.imgContainer}>
          <img src="/temp/background.png" />
        </div>
        <div className={`center ${styles.profileContainer}`}>
          <div className={styles.imgWrapper}>
            <img src="/temp/profile.png" />
            <div className={`center ${styles.userData}`}>
              <div className={styles.username}>Angelina Jully</div>
              <div className={styles.userType}>Photographer</div>
            </div>
          </div>
        </div>
        <div className={`center eq ${styles.infoContainer}`}>
          <div className={styles.info}>
            <div className="center">
              <div>Member Since</div>
              <div>{data.joinedDate}</div>
            </div>
            <div className="center">
              <div>Projects</div>
              <div>{data.projectsCount}</div>
            </div>
            <div className="center">
              <div>Experience</div>
              <div>{data.experienceLevel}</div>
            </div>
          </div>
          <div className="spacer"></div>
          <div className={`${styles.costContainer}`}>
            <div className={`center ${styles.cost}`}>
              <div className={styles.amount}>{data.cost}</div>
              <div className={styles.unit}>hr</div>
            </div>
            <button onClick={onBook}>Book</button>
          </div>
        </div>
        <div className={`center ${styles.selectTab}`}>
          <div className={selectedTab===1 ? styles.active : ''} onClick={()=>setSelectedTab(1)} >Profile</div>
          <div className={selectedTab===2 ? styles.active : ''} onClick={()=>setSelectedTab(2)} >Gallery</div>
        </div>
        { selectedTab === 1 ? <AgentIntroComponent /> : <AgentGalleryComponent /> }
      </div>
    </div>
  );
};

export default AgentDetailComponent;
