import { useState } from 'react';
import styles from './MapOverlayStyle.module.css';
import moment from "moment";

const shootTime = moment().startOf('hour');

const MapOverlayComponent = () => {
    const [speciality, setSpeciality] = useState(1);
    const [sessionHour, setSessionHour] = useState(5);
    const [shootTimeDisplay, setShootTimeDisplay] = useState(shootTime.format('hh:mm a'));
    const [address1, setAddress1] = useState("");
    
    const updateTime = (isAdd: boolean)=>{
        shootTime.add(isAdd ? 1 : -1, 'hour');
        shootTime.date(moment().date())
        setShootTimeDisplay(shootTime.format('hh:mm a'));
    }
    

    const onClick = () => {
        const data = {
            bookingDate: shootTime.format("YYYY-MM-DD"),
            bookingStartDateTime: shootTime.format("YYYY-MM-DD HH:mm:ss"),
            bookingEndDateTime: shootTime.clone().add(sessionHour, 'hour').format("YYYY-MM-DD HH:mm:ss"),
            hours: sessionHour,
            speciality,
            address1
        }
        console.log(data);
    }

    return (
        <div className={styles.mapOverlayContainer}>
            <div className={`center ${styles.locationContainer}`}>
                <div className="center">
                    <i className="fa-solid fa-location-dot primary-color"></i>
                </div>
                <div className="flexible">
                    <input type="text" onInput={(e: any)=>setAddress1(e.target.value)} placeholder='Enter Your Shoot Location' />
                </div>
                <div className="center">
                    <i className="fa-light fa-calendar"></i>
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
                        <i onClick={()=>setSessionHour(sessionHour-1)} className="fa-solid fa-angle-left"></i>
                        <div className="selectedHours flexible center">
                            {sessionHour} hour
                        </div>
                        <i onClick={()=>setSessionHour(sessionHour+1)} className="fa-solid fa-angle-right"></i>
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