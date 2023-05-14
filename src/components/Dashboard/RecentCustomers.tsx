import React from 'react';
import styles from "../../pages/Dashboard.module.css";
import Moment from "react-moment";
import moment from 'moment';
import Constants from '../../Config/Constants';

const RecentCustomers = (props: any) => {
  const { recent } = props;
  return (
    <>
      <div className={styles.recentCustomersGrid}>
        {
          recent && recent.length ?
            recent.map((customer: any, index: any) => (
              <div className={styles.recentCustomerDiv} key={index}>
                <div className={styles.recentCustomersImgDiv}>
                  <img
                    className={styles.recentCustomersImg}
                    alt=""
                    src={`${Constants.adminbackendUrl}${customer.profile}`}
                    height={100}
                    width={100}
                  />
                </div>

                <div className={styles.recentCustomerNameDiv}>
                  <div className={styles.recentCustomerName}>{customer?.clientfirstName} {customer?.clientLastName}</div>
                  <div className={styles.recentCustomerTime}>
                    <Moment format="hh:mm A">{customer?.bookingStartTime}</Moment>
                    -
                    <Moment format="hh:mm A">{moment(customer?.bookingStartTime).add(customer?.session, 'h')}</Moment>
                  </div>
                </div>
              </div>
            )) :
            <div>
              No Recent Customer Found
            </div>
        }
      </div>
    </>
  )
}

export default RecentCustomers