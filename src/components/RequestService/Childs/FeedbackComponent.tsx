import Constants from '../../../Config/Constants';
import styles from './FeedbackStyle.module.css';

const FeedbackComponent = ({ feedback }: any) => {
  feedback.profile = feedback.profile ? Constants.adminbackendUrl + feedback.profile : "/temp/profile.png";

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackInfo}>
        <div className={styles.profilepic}>
          <img src={feedback.profile} />
        </div>
        <div className={`${styles.right} d-flex justify-content-between align-items-center`}>
          <div className={styles.userDetails}>
            <div>{feedback.firstname + " " + feedback.lastname}</div>
            <div>{feedback.title}</div>
          </div>
          <div className="stars">
            {[...Array(5)].map((e, i) => (
              <span className={styles.star} key={i}>
                <i className={`fa-star fa-solid ${i < feedback.rating ? styles.checked :''}`}></i>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.review}>{feedback.description}</div>
    </div>
  );
};

export default FeedbackComponent;
