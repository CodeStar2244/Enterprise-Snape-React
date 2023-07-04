import React from 'react';
import { RHAP_UI } from "react-h5-audio-player/lib/constants";
import styles from "./AllMusic.module.css"
import { Image, Ratio } from "react-bootstrap";
import AudioPlayer from 'react-h5-audio-player';
type showMusicPlayerFunc = any

interface Props {
    showMusicPlayer: showMusicPlayerFunc,
    songName: string,
    singerName: string,
    musiclistClassname: string,
    musicSrc: string,
}
const MusicListComponent = ({ showMusicPlayer, singerName, songName, musiclistClassname, musicSrc }: Props) => {
    return (
        <div className={styles.music} onClick={showMusicPlayer}>
            <div className={styles.srno}>1</div>
            <div className={styles.likebtn}>
                <i className="fa-regular musicicon hearticon fa-heart"></i>
            </div>
            <div className={styles.songpic}>
                <Ratio aspectRatio="1x1">
                    <Image className={styles.imageset} src="../../../album.png" />
                </Ratio>
            </div>
            <div className={styles.songname}> {songName} </div>
            <div className={styles.songauthor}>{singerName}</div>
            <div className={styles.songslider}>
                <AudioPlayer
                    className={musiclistClassname}
                    preload="metadata"
                    showSkipControls={false}
                    showJumpControls={false}
                    customVolumeControls={[]}
                    customAdditionalControls={[]}
                    showDownloadProgress={false}
                    layout="horizontal-reverse"
                    customProgressBarSection={
                        [
                            RHAP_UI.PROGRESS_BAR,
                            RHAP_UI.DURATION,
                        ]
                    }
                    src={musicSrc}
                />
            </div>
            <div className={styles.songdownload}>
                <i className="fa-regular fa-arrow-down-to-line"></i>
            </div>
            <div className={styles.songmore}>
                <i className="fa-regular fa-ellipsis-vertical"></i>
            </div>
        </div>
    )
}

export default MusicListComponent