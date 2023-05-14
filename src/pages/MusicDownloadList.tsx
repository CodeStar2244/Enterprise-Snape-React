import {  Col,  Row } from "react-bootstrap";
import FullMusicNav from "../components/Music/FullMusicNav";
import MusicDownloadsGrid from "../components/Music/DownloadsMusicGrid";


const MusicDownloadList = () => {
  return (
                 <Row className="mx-0">
                    <Col md={12} lg={12} >
                        <FullMusicNav navTitle="Downloads"/>
                        <MusicDownloadsGrid/>
                    </Col>
                </Row>
  )
}

export default MusicDownloadList