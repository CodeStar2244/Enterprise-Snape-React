import { useRef, useState } from 'react';
import styles from './MapOverlayStyle.module.css';
import moment from "moment";
import { useDispatch } from 'react-redux';
import { bookingDetailsAction } from '../../../redux/actions/bookingDetailsAction';
import { Form } from 'react-bootstrap';

const shootDateTime = moment().startOf('hour');

const MapOverlayComponent = () => {
    const dispatch = useDispatch();
    const [speciality, setSpeciality] = useState(1);
    const [sessionHour, setSessionHour] = useState(5);
    const [shootTimeDisplay, setShootTimeDisplay] = useState(shootDateTime.format('hh:mm a'));
    const [address1, setAddress1] = useState("");
    const [isFormHidden, setIsFormHidden] = useState(true);
    
    const updateTime = (isAdd: boolean) => {
        shootDateTime.add(isAdd ? 1 : -1, 'hour');
        setShootTimeDisplay(shootDateTime.format('hh:mm a'));
    }

    const updateSessionHour = (isAdd: boolean) => {
        const newHour = isAdd ? sessionHour+1 : sessionHour-1;
        if(newHour>12 || newHour<1) return;
        setSessionHour(newHour);
    }

    const updateDate = (e: any) => {
        shootDateTime.date(moment(e.target.value).date());
    }
    

    const onClick = () => {
        const data = {
            bookingDate: shootDateTime.format('YYYY-MM-DD'),
            bookingStartDateTime: shootDateTime.format("HH:mm:ss"),
            bookingEndDateTime: shootDateTime.clone().add(sessionHour, 'hour').format("HH:mm:ss"),
            hours: sessionHour,
            speciality,
            address1
        }
        dispatch(bookingDetailsAction(data));
    }

    return (
        <div className={`${styles.mapOverlayContainer} ${isFormHidden? styles.hideForm:''}`}>
            <div className={`center ${styles.locationContainer}`}>
                <div className="center">
                    <i className="fa-solid fa-location-dot primary-color"></i>
                </div>
                <div className="flexible">
                    <input type="text" onInput={(e: any)=>setAddress1(e.target.value)} placeholder='Enter Your Shoot Location' />
                </div>
                <div className="center position-relative">
                    <Form.Group className={`${styles.calander}`}>
                        <Form.Control
                            name="bookingDate"
                            type="date"
                            onChange={updateDate}
                        />
                    </Form.Group>
                </div>
                <div className={`center ${styles.togglebtn}`} onClick={()=>setIsFormHidden(!isFormHidden)}>
                    {isFormHidden ? <i className='fa-regular fa-angle-down'></i> : <i className='fa-regular fa-angle-up'></i>}
                </div>
            </div>
            <div className={styles.formText}>
                What Kind Of Service Are You Looking For?
            </div>
            <div className={`${styles.speciality}`}>
                <div onClick={()=>setSpeciality(2)} className={`tab center flex-column ${speciality == 2 ? styles.selected : ''}`}>
                    <img src="/temp/video.jpeg" />
                    <div className="tabTax">Videographer</div>
                </div>
                <div onClick={()=>setSpeciality(1)} className={`tab center flex-column ${speciality == 1 ? styles.selected : ''}`}>
                    <img src="/temp/photo.jpeg" />
                    <div className="tabTax">Photographer</div>
                </div>
                <div onClick={()=>setSpeciality(3)} className={`tab center flex-column ${speciality == 3 ? styles.selected : ''}`}>
                    <img src="/temp/both.png" />
                    <div className="tabTax">Both</div>
                </div>
            </div>
            <div className={styles.timeContainer}>
                <div className="left center flex-column">
                    <div className={`${styles.text}`}>Session</div>
                    <div className={`${styles.time + ' ' + styles.sessionTime} center w-100`}>
                        <i onClick={()=>updateSessionHour(false)} className="fa-solid fa-angle-left"></i>
                        <div className="selectedHours flexible center">
                            {sessionHour} hour
                        </div>
                        <i onClick={()=>updateSessionHour(true)} className="fa-solid fa-angle-right"></i>
                    </div>
                </div>
                <div className='right center flex-column'>
                    <div className={`${styles.text}`}>Shoot Time</div>
                    <div className={`${styles.time + ' ' + styles.shootTime} center w-100`}>
                        <i onClick={()=>updateTime(false)} className="fa-solid fa-angle-left primary-color"></i>
                        <div className="selectedHours flexible center">
                            {shootTimeDisplay}
                        </div>
                        <i onClick={()=>updateTime(true)} className="fa-solid fa-angle-right primary-color"></i>
                    </div>
                </div>
            </div>
            <div className="center">
                <button className='default-btn' onClick={onClick}>Search</button>
            </div>
        </div>
    )
}

export default MapOverlayComponent