import { useNavigate, useParams } from "react-router-dom";
import styles from "./AgentDetailStyle.module.css";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import AgentGalleryComponent from "./Childs/AgentGalleryComponent";
import AgentIntroComponent from "./Childs/AgentIntroComponent";
import RequestService from "../../api/request-service/requestService";
import Constants from "../../Config/Constants";
import { getExperienceLevel, getSpeciality } from "../../Utils/helper";

const AgentDetailComponent: any = () => {
  const { id }: any = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(1);
  const [agentData, setAgentData] = useState<any>(null);

  useEffect(() => {
    getAgentDetails();
  }, [])

  const onBook = () => {
    console.log("book", agentData);
  };

  const goBack = () => {
    navigate('/request-service')
  }

  const getAgentDetails = async () => {
    const agent = (await RequestService.getAgentById(id)).result.agent;
    // temporory static data
    console.log(agent);
    agent.profile = agent.profile ? Constants.adminbackendUrl + agent.profile : "/temp/profile.png";
    agent.backgroundImage = "/temp/background.png";
    agent.projectsCount = 0;
    agent.rate = getRate(agent) || "-";
    setAgentData(agent);
  }

  const getRate = (data: any) => {
    switch(data.speciality){
      case 1:
        return data.photograpyrate;
      case 2:
        return data.videograpyrate
      case 3:
        return data.bothrate;
    }
  }

  return (
    agentData ?
    <div className={styles.container}>
      <div className="d-flex pb-2">
        <div className={styles.goBack} onClick={goBack}>
          <i className="fa-regular fa-angle-left"></i>
        </div>
        <div className={`center ${styles.userDataTop}`}>
          <div className={styles.username}>{ agentData.firstname + " " + agentData.lastname }</div>
          <div className={styles.userType}>{ getSpeciality(agentData.speciality) }</div>
        </div>
      </div>
      <div className="top-section">
        <div className={styles.imgContainer}>
          <img src={agentData.backgroundImage} />
        </div>
        <div className={`center ${styles.profileContainer}`}>
          <div className={styles.imgWrapper}>
            <img src={agentData.profile} />
            <div className={`center ${styles.userData}`}>
              <div className={styles.username}>{ agentData.firstname + " " + agentData.lastname }</div>
              <div className={styles.userType}>{ getSpeciality(agentData.speciality) }</div>
            </div>
          </div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <div className="center">
              <div>Member Since</div>
              <Moment format="D MMM YYYY">{agentData.joinedDate}</Moment>
            </div>
            <div className="center">
              <div>Projects</div>
              <div>{agentData.projectsCount}</div>
            </div>
            <div className="center">
              <div>Experience</div>
              <div>{ getExperienceLevel(agentData.experiencelevel) }</div>
            </div>
          </div>
          <div className="spacer"></div>
          <div className={`${styles.costContainer}`}>
            <div className={`center ${styles.cost}`}>
              <div className={styles.amount}>{ agentData.rate }</div>
              <div className={styles.unit}>hr</div>
            </div>
            <div className="center">
              <button onClick={onBook}>Book</button>
            </div>
          </div>
        </div>
        <div className={`center ${styles.selectTab}`}>
          <div className={selectedTab===1 ? styles.active : ''} onClick={()=>setSelectedTab(1)} >Profile</div>
          <div className={selectedTab===2 ? styles.active : ''} onClick={()=>setSelectedTab(2)} >Gallery</div>
        </div>
        { selectedTab === 1 ? <AgentIntroComponent agentData={agentData} /> : <AgentGalleryComponent /> }
      </div>
    </div>
    : <></>
  );
};

export default AgentDetailComponent;
