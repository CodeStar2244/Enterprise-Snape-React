import styles from "../../pages/Dashboard.module.css";
import GoogleMapReact from 'google-map-react';
import { width } from "@mui/system";
import { Button } from "react-bootstrap";
import Constants from "../../Config/Constants";
import moment from "moment";

const BookingDetails = (props:any) => {
    const {booking,setBooking} = props;
    const AnyReactComponent = ({text}:any) => <div><i style={{ margin: "0% 0%"}} className="fa-solid fa-location-dot fa-2xl setcolor"></i>{text}</div>
    const defaultProps = {
        center: {
          lat: booking.latitude,
          lng: booking.longitude
        },
        zoom: 16
      };
    return (
        <section className={styles.upcomingBookingsMainDiv}>
            <div className={styles.upcomingBookingsTitle}>Upcoming Bookings Details</div>
            <div className={styles.customerDetails}>
                <div className={styles.customerImgInfoDiv}>
                    <img src={`${Constants.adminbackendUrl}${booking.profile}`} className={styles.upcomingBookingImg} height={100} width={100} alt="" />
                    <div className={styles.customerInfo}>
                        <p className={styles.customerName}>{booking.clientfirstName} {booking.clientLastName}</p>
                        <p className={styles.customerPhotoShootP}>Sports Photography</p>
                    </div>
                </div>
                <div>
                    <h4>R {booking.totalamount}</h4>
                    <p className={styles.customerPhotoShootP}>{booking.session} Hours</p>
                </div>
            </div>
            <div className={styles.bookingDateTimeDiv}>
                <i className="fa-solid fa-clock"></i>
                <span className={styles.bookingDateTimeP}>{moment(booking.bookingStartTime).format("dddd, MMMM Do YYYY [at] h:mm A")}</span>
            </div>
            <div className={styles.bookingAddreessMainDiv}>
                <div className={styles.bookingAddreessHeaderDiv}>
                    <i style={{ margin: "0% 0%" }} className="fa-solid fa-location-dot fa-2xl setcolor"></i>
                    <h6>Booking Address</h6>

                </div>
                <div className={styles.bookingAddressDetailDiv}>
                    <p>{booking.address1},{booking.address2}</p>
                </div>
                <div className={styles.bookingAddressMapDiv}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyDHF0s5msU1ffUR_JqjAnC90mYMAxkDfE4" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent
                            lat={booking.latitude}
                            lng={booking.longitude}
                            text="Location"
                        />
                    </GoogleMapReact>
                </div>
            </div>

            <div className={styles.closeBookingDetailsMainDiv}>
                <span>Further Actions Can Done On App</span>
                <Button className={styles.closeDetailsBtn} onClick={(e)=>setBooking(0)}>Close Details</Button>
            </div>



        </section>
    )
}

export default BookingDetails