import React from 'react'
import { Image } from 'react-bootstrap'
import styles from './Design.module.css'

const DesignCollectionNav = ({ theme }: any) => {
    return (
        <>
            <div
                className={styles.titlediv1}
                style={theme && theme?.background === '#1E1E1E' ? {
                    color: 'white'
                } :
                    {}
                }
            >
                <div className={styles.maintitleheading}>
                    Tebogo Wedding
                </div>
                <div className={styles.iconblock}>
                    <i className="fa-regular fa-heart viewpageicondedesign"></i>
                    <i className="fa-solid fa-arrow-down-to-line viewpageicondedesign"></i>
                    <i className="fa-solid fa-arrow-turn-down-left fa-rotate-180 viewpageicondedesign"></i>
                    <i className="fa-regular fa-play viewpageicondedesign"></i>
                </div>
            </div >
        </>

    )
}

export default DesignCollectionNav