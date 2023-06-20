import { useNavigate } from "react-router-dom";
import styles from './CardStyle.module.css';

const AgentCardComponent = ({data}: any) => {
    const navigate = useNavigate();

    const onBook = () => {
        navigate(`/request-service`);
    }
    const onViewProfile = () => {
        navigate(`/request-service/profile/${data.id}`);
    }
  return (
    <div className={styles.cardContainer}>
        <div className={styles.cardHeader} style={{backgroundImage: `url(${data.backgroundImage})`}} >
            <img className={styles.profile} src={data.profileImage} />
            <div className={`center ${styles.favouriteIcon}`}>
                <i className={`fa-star ${data.isFavourite?'fa-solid':'fa-regular'}`}></i>
            </div>
        </div>
        <div className={styles.cardBody}>
            <div className="center eq">
                <div className={styles.spacer}></div>
                <div className={styles.userData}>
                    <span className={styles.username}>{data.userName}</span>
                    <span className={styles.usertype}>{data.profession}</span>
                </div>
                <div className={`center ${styles.cost}`}>
                    <span className={styles.amount}>{data.cost}</span>
                    <span className={styles.unit}>hr</span>
                </div>
            </div>
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
            <div className={`center eq ${styles.btnContainer}`}>
                <button onClick={onBook}>Book</button>
                <button onClick={onViewProfile}>View Profile</button>
            </div>
        </div>
    </div>
  )
}

export default AgentCardComponent