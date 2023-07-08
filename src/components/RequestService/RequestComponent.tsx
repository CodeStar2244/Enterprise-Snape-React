import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import AgentCardComponent from "./Childs/CardComponent";
import MapComponent from "./Childs/MapComponent";
import styles from "./RequestStyle.module.css";
import { Button, Container, Dropdown, DropdownButton } from "react-bootstrap";
import Paginations from "../Pagination/Pagination";
import RequestService from "../../api/request-service/requestService";
import Constants from "../../Config/Constants";

const RequestComponent = () => {

  useEffect(() => {
    getLocation().then(()=>{
      getAgents();
      getAgentLocations();
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState("50");

  const [agents, setAgents] = useState<any>();
  const [agentsLocation, setAgentsLocation] = useState([]);
  const [centerLocation, setCenterLocation] = useState({
    lat: 0,
    lng: 0,
    label: "",
  });

  const onFilterChange = async () => {
    paginate();
  };

  const paginate = async (e?: any) => {
    setCurrentPage(e || 1);
    getLocation().then(()=>{
      getAgents();
      getAgentLocations();
    });
  };

  const getAgentLocations = async () => {
    const result = await RequestService.getAgentsLocations({
      range: 10000,
      latitude: 22.9952824,
      longitude: 72.6194261,
      page: 0,
      limit: 6,
    });
    setAgentsLocation(result.result?.agents || []);
  };

  const getAgents = async () => {
    const result = await RequestService.getAgents({
      range: 10000,
      latitude: 22.9952824,
      longitude: 72.6194261,
      page: 0,
      limit: 6,
    });
    // temporory
    result.result.agents?.forEach((agent: any)=>{
      agent.profile = agent.profile ? Constants.adminbackendUrl + agent.profile : "/temp/profile.png";
      agent.backgroundImage = "./temp/background.png";
      agent.projectsCount = 0;
      agent.rate = getRate(agent)|| "-";
    });
    setAgents(result.result);
    console.log('agents',result.result.agents);
  }

  const getLocation = async () => {
    const response: any = await RequestService.getCurrentLocation();
    setCenterLocation({
      lat: response.latitude,
      lng: response.longitude,
      label: "You are here",
    });
  };

  function getRate(data: any) {
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
    <div className={styles.mainContainer}>
      {centerLocation.lat ? (
        <div className={styles.mapContainer}>
          <MapComponent
            key={"" + centerLocation.lat + centerLocation.lng}
            center={centerLocation}
            data={agentsLocation}
            labelKey="firstname"
            />
        </div>
      ) : (
        ""
      )}
      <div className={`d-flex align-items-center ${styles.filters}`}>
        <div className={`py-2 px-4 ${styles.filterText}`}>Please Select Your Choice Of Photographer</div>
        <div className={styles.formcontrol}>
          <Form.Select name="categories" defaultValue="" onChange={onFilterChange}>
            <option value="">Categories</option>
            <option value="photographer">Photographer</option>
            <option value="videographer">Videographer</option>
            <option value="both">Both</option>
          </Form.Select>
        </div>
        <DropdownButton
            id="dropdown-basic-button"
            className={styles.dropbtnset}
            title={'Filter'}
            variant="custom"
          >
            <Dropdown.ItemText className={styles.dropitem}>
              <Form.Label><i className="fa-solid fa-sliders"></i> Range</Form.Label><br />
              <Form.Range className="custom-range" min={0} max={10000} value={range} onChange={(e)=>setRange(e.target.value)} onMouseUp={onFilterChange} />
              <div className="d-flex space-between w-100">
                <div>0</div>
                <div className="center flex-grow-1">{range}</div>
                <div>10000</div>
              </div>
            </Dropdown.ItemText>
            <Dropdown.Item className={styles.dropitem}>
            </Dropdown.Item>
        </DropdownButton>
        <div className={styles.formcontrol}>
          <Form.Select name="sort" defaultValue="" onChange={onFilterChange}>
            <option value="">Sort</option>
          </Form.Select>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {agents?.agents.map((item: any) => (
          <AgentCardComponent key={item.id} data={item} />
        ))}
      </div>

      <Paginations itemPerPage={6} totalItems={agents?.total} currentPage={currentPage} paginate={paginate}></Paginations>
    </div>
  );
};

export default RequestComponent;
