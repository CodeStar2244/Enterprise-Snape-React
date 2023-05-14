import React from 'react'
import { Image } from 'react-bootstrap'
import styles from './Design.module.css'

const DesignCollectionNavMobile = ({ theme }: any) => {
    return (
        <>
            <div
                className={styles.titledivmobile}
                style={theme && theme?.background === '#1E1E1E' ? {
                    color: 'white'
                } :
                    {}
                }
            >
                <div className={styles.maintitleheadingmobile}>
                    Tebogo Wedding
                </div>
                <div className={styles.iconblockmobile}>
                    <i className="fa-regular fa-heart viewpageicondedesignmobile"></i>
                    <i className="fa-solid fa-arrow-down-to-line viewpageicondedesignmobile"></i>
                    <i className="fa-solid fa-arrow-turn-down-left fa-rotate-180 viewpageicondedesignmobile"></i>
                    <i className="fa-regular fa-play viewpageicondedesignmobile"></i>
                </div>
            </div>
        </>

    )
}

export default DesignCollectionNavMobile