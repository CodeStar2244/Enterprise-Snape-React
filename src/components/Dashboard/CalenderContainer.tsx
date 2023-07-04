import styles from "../../pages/Dashboard.module.css";
import Calender from "react-calendar";
import "./Calender.css";
import SkeletonLoader from "../Loader/SkeletonLoader";
import UpcomingBookings from "./UpcomingBookings";

const CalenderContainer = ({ handleDateChange, booking, setBooking, date, upcoming, upcomingLoader }: any) => {
  const todayDate = new Date();
  return (
    <section className={styles.rightcontainer}>
      <div className={styles.upcomingBookingsTitle}>Upcoming Bookings</div>
      <div className={styles.calenderDiv}>
        <Calender onChange={handleDateChange} value={date} minDate={todayDate} />

      </div>
      <div className={styles.rightcontainerInner}>

        {/* <div className={styles.upcomingBookingsParent}>
                <div className={styles.upcomingBookings}>Upcoming Bookings</div>
              </div> */}
        <div className={styles.frameParent1}>
          <div className={styles.monday16Sept2021Parent}>
            <div className={styles.monday16Sept}>
              {date.toDateString()}
            </div>
            <button className={styles.cutomersButton}>
              {upcoming.length} customers
            </button>
          </div>
          <div className={styles.totalCustomers}>
            {upcomingLoader ? <SkeletonLoader /> : <UpcomingBookings upcoming={upcoming} booking={booking} setBooking={setBooking} />}
          </div>
        </div>

      </div>
    </section>
  )
}

export default CalenderContainer