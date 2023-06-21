import styles from "./AgentIntroStyle.module.css";

const AgentIntroComponent = () => {
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

  return (
    <div className={styles.introContainer}>
      <div className="left">
        <div className={styles.mainInfo}>
          <div className={styles.title}>Introduction</div>
          <div className={styles.title}>Specialty</div>
          <div className={styles.title}>Categories</div>
        </div>
        <div className={`${styles.costContainer}`}>
          <div className={`center ${styles.cost}`}>
            <div className={styles.amount}>{data.cost}</div>
            <div className={styles.unit}>hr</div>
          </div>
          <button onClick={onBook}>Book</button>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default AgentIntroComponent;
