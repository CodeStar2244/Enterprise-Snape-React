import {  Col,  Row } from "react-bootstrap";
import GalleryGrid from "../components/Gallery/GalleryGrid";
import FullMusicNav from "../components/Music/FullMusicNav";
import MusicGrid from "../components/Music/DownloadsMusicGrid";
import MusicCollectionGrid from "../components/Music/CollectionsMusicGrid";


const MusicCollectionList = () => {
  return (
                 <Row className="mx-0">
                    <Col md={12} lg={12} >
                        <FullMusicNav navTitle="Collections"/>
                        <MusicCollectionGrid/>
                    </Col>
                </Row>
  )
}

export default MusicCollectionList