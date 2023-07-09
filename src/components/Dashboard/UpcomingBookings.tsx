import React from 'react';
import styles from "../../pages/Dashboard.module.css";
import Moment from "react-moment";
import moment from 'moment';
import Constants from '../../Config/Constants';

const UpcomingBookings = (props: any) => {
    const { upcoming ,booking, setBooking } = props;
    return (
        <>
            {
                upcoming?.length ?
                    upcoming.map((customer: any,index:any) => (
                        <div className={styles.customerBox} key={index}>
                            <div className={styles.customerLeftDiv}>
                                <img
                                    className={styles.customerImage}
                                    alt="customer img"
                                    src={`${Constants.adminbackendUrl}${customer.profile}`}
                                />
                                <div className={styles.customerData}>
                                    <div className={styles.customerName}>
                                        {customer.clientfirstName} {customer.clientLastName}
                                    </div>
                                    <div className={styles.customerTime}>
                                        <Moment format="hh:mm A">{customer?.bookingStartTime}</Moment>
                                        -
                                        <Moment format="hh:mm A">{moment(customer?.bookingStartTime).add(customer?.session, 'h')}</Moment>
                                    </div>
                                </div>

                            </div>
                            <div className={styles.rightCustomerImage}  onClick={(e)=>setBooking(customer)}>
                                <img
                                    className={styles.groupIcon}
                                    alt=""
                                    src="../group-103.svg"
                                />
                            </div>
                        </div>
                    )) :
                    <div className={styles.nobooking}>
                        No Bookings Found
                    </div>
            }
        </>
    )
}

export default UpcomingBookings