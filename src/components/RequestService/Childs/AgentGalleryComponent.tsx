import { useEffect, useState } from 'react';
import RequestService from '../../../api/request-service/requestService';
import Grid from '../../Grid';
import GalleryLoader from '../../Loader/GalleryLoader';
import styles from './AgentGalleryStyle.module.css';

const AgentGalleryComponent = ({ agentId }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageTab, setIsImageTab] = useState(true);
  const [galleryData, setGalleryData] = useState<any>();
  const [videoData, setVideoData] = useState<string>("");

  useEffect(() => {
    if (isImageTab) {
      getGalleryData();
    } else {
      getVideosData();
    }
  }, [isImageTab]);

  const getGalleryData = async () => {
    setIsLoading(true);
    const result = await RequestService.getGalleryData(agentId);
    setGalleryData({
      files: result.result.portFolioFiles.map((item: any) => { return { ...item, url: item.compressedCdnUrl } })
    });
    setIsLoading(false);
  }

  const getVideosData = async () => {
    setIsLoading(true);
    const result = await RequestService.getVideos(agentId);
    const data = result.result.portFolioFiles.map((video: any) => video.iframe).join("");
    setVideoData(data || "");
    setIsLoading(false);
  }

  return (
    isLoading ?
      <GalleryLoader /> :
      (<div>
        <div className={`center ${styles.selectTab}`}>
          <div className={isImageTab ? styles.active : ''} onClick={() => setIsImageTab(true)} >Photos</div>
          <div className={!isImageTab ? styles.active : ''} onClick={() => setIsImageTab(false)} >Videos</div>
        </div>
        {isImageTab ?
          <Grid startSlideShow={false} imagesArr={galleryData?.files} gridStyle={galleryData?.gridStyle} gridSpacing={galleryData?.gridSpacing} /> :
          <div className={styles.iframeWrapper} dangerouslySetInnerHTML={{ __html: videoData }} ></div>
        }
      </div>)
  )
}

export default AgentGalleryComponent