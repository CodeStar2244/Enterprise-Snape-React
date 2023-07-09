import styles from './FavouritesStyle.module.css';
import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";
import Constants from "../../Config/Constants";
import RequestService from "../../api/request-service/requestService";
import Paginations from "../Pagination/Pagination";
import AgentCardComponent from "./Childs/CardComponent";


const FavouritesCompoent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState("1250");
  const [agents, setAgents] = useState<any>();
  const [centerLocation, setCenterLocation] = useState<any>();

  useEffect(() => {
    getLocation();
  }, []);
  useEffect(() => {
    if(centerLocation) onFilterChange();
  }, [centerLocation])

  const onFilterChange = async () => {
    paginate();
  };

  const paginate = async (e?: any) => {
    setCurrentPage(e || 1);
    getAgents();
  };

  const getAgents = async () => {
    const params = {
      range,
      latitude: centerLocation.lat,
      longitude: centerLocation.lng,
      page: currentPage - 1,
      limit: 6,
    };

    (async()=>{
      const result = await RequestService.getFavouriteAgents(params);
      // temporory
      result.result.agents?.forEach((agent: any)=>{
        agent.profile = agent.profile ? Constants.adminbackendUrl + agent.profile : "/temp/profile.png";
        agent.backgroundImage = "/temp/background.png";
        agent.projectsCount = 0;
        agent.rate = getRate(agent)|| "-";
        agent.isFavourite = true;
      });
      setAgents(result.result);
      console.log('agents',result.result.agents);
    })();
    
  }

  const getLocation = async () => {
    const response: any = await RequestService.getCurrentLocation();
    setCenterLocation({
      lat: response.latitude,
      lng: response.longitude,
      label: "You are here",
    });
  }

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
        title={<span>
          <span>Filter &nbsp;</span>
          <i className='fa-regular fa-angle-down'></i>
        </span>}
        variant="custom"
      >
        <Dropdown.ItemText className={styles.dropitem}>
          <Form.Label><i className="fa-solid fa-sliders"></i> Range</Form.Label><br />
          <input type="range" className={`${styles.customRange} w-100`} min={30} max={10000} value={range} onChange={(e)=>setRange(e.target.value)} onTouchEnd={onFilterChange} onMouseUp={onFilterChange} />
          <div className="d-flex space-between w-100">
            <div>30</div>
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
  
}

export default FavouritesCompoent