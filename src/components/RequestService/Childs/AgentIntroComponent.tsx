import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import RequestService from "../../../api/request-service/requestService";
import styles from "./AgentIntroStyle.module.css";
import FeedbackComponent from "./FeedbackComponent";
import Constants from "../../../Config/Constants";

const AgentIntroComponent: any = ({agentData}: any) => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [categories, setCategories] = useState([]);
  const [reviews, setReviews] = useState([]);

  console.log(agentData,'fff')
  useEffect(() => {
    getCategory();
    getReviews();
  }, [])
  

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
      {id: 2, name: "Fashion", img: "/temp/catagory.jpeg"},
      {id: 3, name: "Family", img: "/temp/catagory.jpeg"},
      {id: 4, name: "Pets", img: "/temp/catagory.jpeg"},
      {id: 5, name: "Corporate", img: "/temp/catagory.jpeg"},
      {id: 6, name: "Action", img: "/temp/catagory.jpeg"},
    ]
  };

  const onBook = () => {
      navigate(`/request-service/book-agent/${agentData.id}`);
  }

  const getCategory = async () => {
    const response = await RequestService.getAgentCategoryById(id);
    console.log(response)
    setCategories(response.result?.agent || []);
  }

  const getReviews = async () => {
    const response = await RequestService.getAgentReviewsById(id);
    console.log(response);
    setReviews(response.result?.bookings || []);
  }

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
              { agentData.speciality == 1 || agentData.speciality == 3 ? <img src="/temp/photo.jpeg" /> : ''}
              { agentData.speciality == 2 || agentData.speciality == 3 ? <img src="/temp/video.jpeg" /> : ''}
          </div>
          <div className={styles.title}>Categories</div>
          <div className={styles.categories}  >
            {categories.map((category: any, index)=>
            <div className="center" key={index}>
              <img src={Constants.adminbackendUrl + category.image} />
              <div className={`center ${styles.txt}`}>{category.categories_title}</div>
            </div>
            )}
          </div>
        </div>
        <div className={`${styles.costContainer}`}>
          <div className={`center ${styles.cost}`}>
            <div className={styles.amount}>{agentData.rate}</div>
            <div className={styles.unit}>hr</div>
          </div>
          <button onClick={onBook}>Book</button>
        </div>
      </div>
      <div className={styles.right}>
        {reviews.map((feedback: any)=><FeedbackComponent key={feedback.id} feedback={feedback} />)}
      </div>
    </div>
  );
};

export default AgentIntroComponent;
