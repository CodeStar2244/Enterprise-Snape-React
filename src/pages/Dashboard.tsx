import { FunctionComponent, useState, useEffect } from "react";
import { Button, Container, Image, Row, Col, Nav, NavItem, Ratio } from "react-bootstrap";
import styles from "./Dashboard.module.css";
import Calender from "react-calendar";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/Dashboard/CardComponent";
import Layout from "../components/Layout";
import { MESSAGE, STATUS_CODE, VALIDATIONS } from "../Utils/constants";
import { NotificationWithIcon } from "../Utils/helper";
import DashboardService from "../api/Dashboard/dashboard";
import Moment from "react-moment";
import moment from 'moment'
import SkeletonLoader from "../components/Loader/SkeletonLoader";
import UpcomingBookings from "../components/Dashboard/UpcomingBookings";
import RecentCustomers from "../components/Dashboard/RecentCustomers";
import CalenderContainer from "../components/Dashboard/CalenderContainer";
import BookingDetails from "../components/Dashboard/BookingDetails";
const Dashboard: FunctionComponent = () => {
  const [date, setDate] = useState(new Date());
  const [booking, setBooking] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getDashboardData();
  }, [])

  const [summary, setSummary] = useState({
    "clients": 0,
    "photoGraphy": 0,
    "videoGraphy": 0,
    "revenue": 0,
    "code": 0,
    "data": {}
  })
  const [recent, setRecent] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [upcomingLoader, setUpcomingLoader] = useState(true);
  const [recentLoader, setRecentLoader] = useState(true);

  async function getDashboardData() {
    try {
      DashboardService.getSummary().then((res: any) => {
        if (res && res?.code === STATUS_CODE.SUCCESS) {
          setSummary(res?.result)
        }
      }).catch((err) => { throw err })
      DashboardService.getRecentCustomer().then((recentRes: any) => {
        if (recentRes && recentRes?.code === STATUS_CODE.SUCCESS) {
          setRecent(recentRes?.result?.recentCustomers)
          setRecentLoader(false);
        }
      }).catch((err) => { throw err })
      const currentDate = moment().format("YYYY-MM-DD")

      DashboardService.getUpComingBookings(currentDate).then((upcomingRes: any) => {
        if (upcomingRes && upcomingRes?.code === STATUS_CODE.SUCCESS) {
          setUpcoming(upcomingRes?.result?.recentCustomers);
          setUpcomingLoader(false);
        }
      }).catch((err) => { throw err })
    } catch (err: any) {
      if (err && err?.status === STATUS_CODE.UNAUTHORIZED) {
        NotificationWithIcon("error", MESSAGE.UNAUTHORIZED || VALIDATIONS.SOMETHING_WENT_WRONG)
        navigate('/');
      } else {
        NotificationWithIcon("error", err?.data?.error?.message || VALIDATIONS.SOMETHING_WENT_WRONG)
      }
    }
  }

  const handleDateChange = async (changeDate: any) => {
    setDate(changeDate)
    setUpcomingLoader(true);
    const viewDate = moment(changeDate).format("YYYY-MM-DD")
    DashboardService.getUpComingBookings(viewDate).then((upcomingRes: any) => {
      if (upcomingRes && upcomingRes?.code === STATUS_CODE.SUCCESS) {
        setUpcoming(upcomingRes?.result?.recentCustomers);
        setUpcomingLoader(false);
      }
    })
  }


  return (
    <Layout>
      <>
        <div className={styles.bottomsection} id="bottomSection">
          <section className={styles.leftcontainer}>
            <div className={styles.cardsParent}>
              <div className={styles.cards}>
                <div className={styles.clientsParent}>
                  <Ratio aspectRatio="1x1">
                    <CardComponent classname="clients" topTitle="Clients" middleTitle={summary.clients} bottomTitle="Last 7 days" backgroudBox="../rectangle-52.svg" iconImage="../h38ch38bm0014iconset011-1.svg" />
                  </Ratio>
                  <Ratio aspectRatio="1x1">
                    <CardComponent classname="photography" topTitle="Photography" middleTitle={summary.photoGraphy} bottomTitle="Last 7 days" backgroudBox="../cameraiconbg.svg" iconImage="../cameraicon.svg" />
                  </Ratio>
                </div>
                <div className={styles.clientsParent}>
                  <Ratio aspectRatio="1x1">
                    <CardComponent classname="videography" topTitle="Videography" middleTitle={summary.videoGraphy} bottomTitle="Last 7 days" backgroudBox="../videoiconbg.svg" iconImage="../videoicon.svg" />
                  </Ratio>
                  <Ratio aspectRatio="1x1">
                    <CardComponent classname="revenue" topTitle="Revenue" middleTitle={summary.revenue} bottomTitle="Last 7 days" backgroudBox="../moneybankbg.svg" iconImage="../moneybank.svg" />
                  </Ratio>
                </div>
              </div>
              <div className={styles.recentCustomersParent}>
                <h3 className={styles.recentCustomers}>Recent Customers</h3>
                {recentLoader ? <SkeletonLoader /> : <RecentCustomers recent={recent} />}
              </div>
            </div>
          </section>
          {
            booking ?
              <BookingDetails
                booking={booking}
                setBooking={setBooking} 
                /> :
              <CalenderContainer
                upcoming={upcoming}
                booking={booking}
                setBooking={setBooking}
                date={date}
                upcomingLoader={upcomingLoader}
                handleDateChange={handleDateChange}
              />

          }
        </div>
      </>
    </Layout>

  );
};

export default Dashboard;
