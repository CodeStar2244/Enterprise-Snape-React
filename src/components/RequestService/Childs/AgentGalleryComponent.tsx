import { useEffect, useState } from 'react';
import RequestService from '../../../api/request-service/requestService';
import Grid from '../../Grid';
import GalleryLoader from '../../Loader/GalleryLoader';

const AgentGalleryComponent = ({ agentId }: any) => {

  const [galleryData, setGalleryData] = useState<any>();

  useEffect(() => {
    getGalleryData()
  }, []);

  const getGalleryData = async () => {
    const result = await RequestService.getGalleryData(agentId);
    setGalleryData({
      files: result.result.portFolioFiles.map((item: any) => { return { ...item, url: item.compressedCdnUrl } })
    });
  }

  return (
    <div>
      {
        galleryData ?
          <Grid startSlideShow={false} imagesArr={galleryData?.files} gridStyle={galleryData?.gridStyle} gridSpacing={galleryData?.gridSpacing} />
          : <GalleryLoader />
      }
    </div>
  )
}

export default AgentGalleryComponent