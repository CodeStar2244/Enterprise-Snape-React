import { createRef, FunctionComponent, useRef, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import ReactAudioPlayer from "react-audio-player";
import { Image, Ratio } from "react-bootstrap";
import styles from "./AllMusic.module.css"
import { RHAP_UI } from "react-h5-audio-player/lib/constants";
import $ from 'jquery';
import { musicList } from "./data";
import MusicListComponent from "./MusicListComponent";



const AllMusic: FunctionComponent = () => {
    // const audioPlayer = useRef()
    const [currentSongName, setCurrentSongName] = useState("");
    const [currentSingerName, setCurrentSingerName] = useState("");
    const [currentMusicSrc, setCurrentMusicSrc] = useState("");
    const [currentMusicClassName, setCurrentMusicClassName] = useState("");
    const audioPlayer: any = createRef();
    const playButtonref: any = createRef();
    const playButton = <i ref={playButtonref} className="fa-sharp musicplayericon playicon fa-solid fa-circle-play"></i>
    const pauseButton = <i className="fa-sharp musicplayericon playicon fa-solid fa-circle-pause"></i>
    const forwardButton = <i className="fa-light musicplayericon forwardicon fa-forward"></i>
    const backwardButton = <i className="fa-light musicplayericon forwardicon fa-backward"></i>
    const showMusicPlayer = async (e: any, song: any) => {
        const currentSongSrc = song.src;
        setCurrentMusicSrc(currentSongSrc);
        setCurrentSingerName(song.singer);
        setCurrentSongName(song.name);
        setCurrentMusicClassName(song.musicClass);
        $("#musicPlayerComponent").css({ bottom: '0%', display: "block", right: "1%" });
        playButtonref.current.click();
    }

    const playingFunction = (e: any) => {
        const currentWidth = audioPlayer.current.progressBar.current.getAttribute('aria-valuenow');
        const currentAudioPlayer: any = document.getElementsByClassName(currentMusicClassName)[0].childNodes[1].childNodes[0].childNodes[0];
        currentAudioPlayer.setAttribute('aria-valuenow', currentWidth)
        const upperBar = currentAudioPlayer.childNodes[0].childNodes[0];
        const lowerBar = currentAudioPlayer.childNodes[0].childNodes[1];
        upperBar.style.left = `${currentWidth}%`
        lowerBar.style.width = `${currentWidth}%`

    }

    return (
        <>
            <div className={styles.maincomp}>
                <div className="allsongs">
                    {musicList.map((song) => (
                        <MusicListComponent
                            showMusicPlayer={(e: any) => showMusicPlayer(e, song)}
                            singerName={song.singer}
                            songName={song.name}
                            musiclistClassname={song.musicClass}
                            musicSrc={song.src}
                        />

                    ))}


                </div>
                <div className="mainsong">
                    <div id="musicPlayerComponent" className={styles.mainmusic}>
                        <AudioPlayer
                            layout="horizontal-reverse"
                            ref={audioPlayer as any}
                            customVolumeControls={[]}
                            customAdditionalControls={[]}
                            customControlsSection={[
                                <div className={styles.mainsongpic}>
                                    <Ratio aspectRatio="1x1" className={styles.mainsongimg}>
                                        <Image className={styles.mainimageset} src="../../../album.png" />
                                    </Ratio>
                                    <div className={styles.mainheading}>
                                        <div className={styles.maintitle}>
                                            {currentSongName}
                                        </div>
                                        <div className={styles.subtitle}>
                                            {currentSingerName}
                                        </div>
                                    </div>
                                </div>,
                                RHAP_UI.MAIN_CONTROLS,
                            ]}

                            customProgressBarSection={
                                [
                                    RHAP_UI.CURRENT_TIME,
                                    RHAP_UI.PROGRESS_BAR,
                                    RHAP_UI.DURATION,
                                    <div className={styles.nextsong}>
                                        <div className={styles.mainheading}>
                                            <div className={styles.upnextheading}>
                                                Up Next
                                            </div>
                                            <div className={styles.subtitle}>
                                                Winnie Gardon
                                            </div>
                                        </div>
                                    </div>,
                                ]
                            }
                            customIcons={{
                                play: playButton,
                                pause: pauseButton,
                                forward: forwardButton,
                                rewind: backwardButton
                            }}
                            src={currentMusicSrc}
                            onListen={playingFunction}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AllMusic;
