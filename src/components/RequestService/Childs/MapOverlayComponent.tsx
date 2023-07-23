import { useState } from 'react';
import styles from './MapOverlayStyle.module.css';

const MapOverlayComponent = ({ onSearch }: any) => {
    const [speciality, setSpeciality] = useState(1);

    const onClick = () => {
        onSearch();
        console.log('search')
    }

    return (
        <div className={styles.mapOverlayContainer}>
            <div className={`center ${styles.locationContainer}`}>
                <div className="center">
                    <i className="fa-solid fa-location-dot primary-color"></i>
                </div>
                <div className="flexible">
                    <input type="text" placeholder='Enter Your Shoot Location' />
                </div>
                <div className="center">
                    <i className="fa-light fa-calendar"></i>
                </div>
            </div>
            <div className={styles.formText}>
                What Kind Of Service Are You Looking For?
            </div>
            <div className={`${styles.speciality}`}>
                <div className={`tab center flex-column ${speciality == 2 ? styles.selected : ''}`}>
                    <img src="/temp/video.jpeg" />
                    <div className="tabTax">Videographer</div>
                </div>
                <div className={`tab center flex-column ${speciality == 1 ? styles.selected : ''}`}>
                    <img src="/temp/photo.jpeg" />
                    <div className="tabTax">Photographer</div>
                </div>
                <div className={`tab center flex-column ${speciality == 3 ? styles.selected : ''}`}>
                    <img src="/temp/both.png" />
                    <div className="tabTax">Both</div>
                </div>
            </div>
            <div className={styles.timeContainer}>
                <div className="left center flex-column">
                    <div className={`${styles.text}`}>Session</div>
                    <div className={`${styles.time + ' ' + styles.sessionTime} center w-100`}>
                        <i className="fa-solid fa-angle-left"></i>
                        <div className="selectedHours flexible center">
                            5 hour
                        </div>
                        <i className="fa-solid fa-angle-right"></i>
                    </div>
                </div>
                <div className='right center flex-column'>
                    <div className={`${styles.text}`}>Shoot Time</div>
                    <div className={`${styles.time + ' ' + styles.shootTime} center w-100`}>
                        <i className="fa-solid fa-angle-left primary-color"></i>
                        <div className="selectedHours flexible center">
                            08:00am
                        </div>
                        <i className="fa-solid fa-angle-right primary-color"></i>
                    </div>
                </div>
            </div>
            <div className={`center ${styles.submit}`}>
                <button onClick={onClick}>Search</button>
            </div>
        </div>
    )
}

export default MapOverlayComponent