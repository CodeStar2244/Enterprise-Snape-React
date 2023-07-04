import styles from './FeedbackStyle.module.css';

const FeedbackComponent = ({ feedback }: any) => {
  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.feedbackInfo}>
        <div className={styles.profilepic}>
          <img src={feedback.profile} />
        </div>
        <div className={`${styles.right} d-flex justify-content-between align-items-center`}>
          <div className={styles.userDetails}>
            <div>{feedback.userName}</div>
            <div>{feedback.userDesg}</div>
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
      <div className={styles.review}>{feedback.review}</div>
    </div>
  );
};

export default FeedbackComponent;
