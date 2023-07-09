import { useNavigate } from "react-router-dom";
import styles from './CardStyle.module.css';
import Moment from "react-moment";
import { getExperienceLevel, getSpeciality } from "../../../Utils/helper";
import RequestService from "../../../api/request-service/requestService";
import { useState } from "react";

const AgentCardComponent = ({data}: any) => {
    const navigate = useNavigate();
    const [isFavourite, setIsFavourite] = useState(data.isFavourite)

    const onBook = () => {
        navigate(`/request-service`);
    }
    const onViewProfile = () => {
        navigate(`/request-service/profile/${data.id}`);
    }

    const toggleFav = () =>{
        data.isFavourite= !data.isFavourite;
        setIsFavourite(data.isFavourite);
        RequestService.addToFavourite(data.id, data.isFavourite ? 1 : 0);
    }

  return (
    <div className={styles.cardContainer}>
        <div className={styles.cardHeader} style={{backgroundImage: `url(${data.backgroundImage})`}} >
            <img className={styles.profile} src={data.profile} />
            <div className={`center ${styles.favouriteIcon}`} onClick={toggleFav} >
                <i className={`fa-star ${isFavourite?'fa-solid':'fa-regular'}`}></i>
            </div>
        </div>
        <div className={styles.cardBody}>
            <div className="center eq">
                <div className={styles.spacer}></div>
                <div className={styles.userData}>
                    <span className={styles.username}>{data.firstname + " " + data.lastname}</span>
                    <span className={styles.usertype}>{ getSpeciality(data.speciality)}</span>
                </div>
                <div className={`center ${styles.cost}`}>
                    <span className={styles.amount}>{data.rate}</span>
                    <span className={styles.unit}>hr</span>
                </div>
            </div>
            <div className={styles.info}>
                <div className="center">
                    <div>Member Since</div>
                    <Moment format="D MMM YYYY">{data.createdAt}</Moment>
                </div>
                <div className="center">
                    <div>Projects</div>
                    <div>{data.projectsCount}</div>
                </div>
                <div className="center">
                    <div>Experience</div>
                    <div>{ getExperienceLevel(data.experiencelevel)}</div>
                </div>
            </div>
            <div className={`center eq ${styles.btnContainer}`}>
                <button onClick={onBook}>Book</button>
                <button onClick={onViewProfile}>View Profile</button>
            </div>
        </div>
    </div>
  )
}

export default AgentCardComponent