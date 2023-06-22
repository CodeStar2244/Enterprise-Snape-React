import styles from "./AgentIntroStyle.module.css";
import FeedbackComponent from "./FeedbackComponent";

const AgentIntroComponent = () => {
  const data = {
    id: 1,
    profileImage: "/temp/profile.png",
    backgroundImage: "/temp/background.png",
    userName: "User 1",
    profession: "Developer",
    cost: 1001,
    joinedDate: "20 March 2023",
    projectsCount: 57,
    experienceLevel: "Mid-level",
    isFavourite: true,
    feedbacks: [
      {id: 1, profile:'/temp/profilepic.jpeg', userName: "Annette Black", userDesg: "Teacher", rating: 4, review: "I appointed Angelina for a shoot at our school and we were very happy with her service. She conducted herself very professionally and shoot everything within the time period. Her delivery was also on time." },
      {id: 2, profile:'/temp/profilepic.jpeg', userName: "Annette Black", userDesg: "Teacher", rating: 4, review: "I appointed Angelina for a shoot at our school and we were very happy with her service. She conducted herself very professionally and shoot everything within the time period. Her delivery was also on time." },
      {id: 3, profile:'/temp/profilepic.jpeg', userName: "Annette Black", userDesg: "Teacher", rating: 4, review: "I appointed Angelina for a shoot at our school and we were very happy with her service. She conducted herself very professionally and shoot everything within the time period. Her delivery was also on time." },
      {id: 4, profile:'/temp/profilepic.jpeg', userName: "Annette Black", userDesg: "Teacher", rating: 4, review: "I appointed Angelina for a shoot at our school and we were very happy with her service. She conducted herself very professionally and shoot everything within the time period. Her delivery was also on time." }
    ],
    introduction: "Hi. My name is Angelina Jully. I have a serious passion for photography and specialize in a couple of shoots. I have a degree in visual communication that I received from Vega",
    categories : [
      {id: 1, name: "Wedding", img: "/temp/catagory.jpeg"},
      {id: 1, name: "Fashion", img: "/temp/catagory.jpeg"},
      {id: 1, name: "Family", img: "/temp/catagory.jpeg"},
      {id: 1, name: "Pets", img: "/temp/catagory.jpeg"},
      {id: 1, name: "Corporate", img: "/temp/catagory.jpeg"},
      {id: 1, name: "Action", img: "/temp/catagory.jpeg"},
    ]
  };

  const onBook = () => {
    console.log("book", data);
  };

  return (
    <div className={`center ${styles.introContainer}`}>
      <div className={styles.left}>
        <div className={styles.mainInfo}>
          <div className={styles.title}>Introduction</div>
          <div className={styles.introduction}>
            {data.introduction}
          </div>
          <div className={styles.title}>Speciality</div>
          <div className={styles.speciality}>
              <img src="/temp/photo.jpeg" />
              <img src="/temp/video.jpeg" />
          </div>
          <div className={styles.title}>Categories</div>
          <div className={styles.categories}  >
            {data.categories.map((category)=>
            <div className="center" key={category.id}>
              <img src={category.img} />
              <div className={`center ${styles.txt}`}>{category.name}</div>
            </div>
            )}
          </div>
        </div>
        <div className={`${styles.costContainer}`}>
          <div className={`center ${styles.cost}`}>
            <div className={styles.amount}>{data.cost}</div>
            <div className={styles.unit}>hr</div>
          </div>
          <button onClick={onBook}>Book</button>
        </div>
      </div>
      <div className={styles.right}>
        {data.feedbacks.map((feedback)=><FeedbackComponent key={feedback.id} feedback={feedback} />)}
      </div>
    </div>
  );
};

export default AgentIntroComponent;
