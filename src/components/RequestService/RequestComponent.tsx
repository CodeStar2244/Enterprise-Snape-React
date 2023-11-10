import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import AgentCardComponent from "./Childs/CardComponent";
import MapComponent from "./Childs/MapComponent";
import styles from "./RequestStyle.module.css";
import { Button, Container, Dropdown, DropdownButton } from "react-bootstrap";
import Paginations from "../Pagination/Pagination";
import RequestService from "../../api/request-service/requestService";
import Constants from "../../Config/Constants";
import MapOverlayComponent from "./Childs/MapOverlayComponent";
import { useSelector } from "react-redux";
import Skeleton from '@mui/material/Skeleton';
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  DirectionsRenderer,
} from '@react-google-maps/api';


const RequestComponent = ({ isFavourite }: any) => {
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState("1250");
  const [agents, setAgents] = useState<any>();
  const [agentsLocation, setAgentsLocation] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("select");
  const [centerLocation, setCenterLocation] = useState<any>();
  const [speciality, setSpeciality] = useState(1);
  const formData = useSelector((state: any) => state.bookingDetailsReducer);
  const [address1, setAddress1] = useState("");
  const [mediaCategories,setMediaCategories] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDHF0s5msU1ffUR_JqjAnC90mYMAxkDfE4",
    libraries: ['places'],
  });


  useEffect(() => {
    getLocation();
    getMediaCategories();
  }, []);

  useEffect(() => {
    if (centerLocation) getAgents();
  }, [formData])

  useEffect(() => {
    if (centerLocation) onFilterChange();
  }, [centerLocation])

  const onFilterChange = async () => {
    paginate();
  };
  
  const handleCategoryChange = (e:any)=>{
     const value = e.target.value;
     setSelectedCategory(value);
     if(value !== "select"){
      getAgents(value)
     }else{
      getAgents();
     }
  }

  const paginate = async (e?: any) => {
    setCurrentPage(e || 1);
    getAgents();
  };

  const getAgents = async (category?:number,sort?:string) => {
    const params:any = {
      range,
      latitude: centerLocation.lat,
      longitude: centerLocation.lng,
      page: currentPage - 1,
      limit: 6,
      speciality:formData.speciality,
    };
    if(category){
      params.category = category
    }

    (async () => {
      setLoader(true)
      const result = await RequestService.getAgentsLocations(params);
      setLoader(false)

      setAgentsLocation(result.result?.agents || []);
    })();

    (async () => {
      setLoader(true);
      const result = isFavourite ? (await RequestService.getFavouriteAgents(params)) : (await RequestService.getAgents(params));
      setLoader(false)

      // temporory
      result.result.agents?.forEach((agent: any) => {
        agent.profile = agent.profile ? Constants.adminbackendUrl + agent.profile : "/temp/profile.png";
        agent.backgroundImage = "/temp/background.png";
        agent.projectsCount = 0;
        agent.rate = getRate(agent) || "-";
        if(isFavourite) agent.isFavourite = true;
      });
      setAgents(result.result);
      console.log('agents', result.result.agents);
    })();

  }

  const getLocation = async () => {
    setLoader(true);
    const response: any = await RequestService.getCurrentLocation();
    setLoader(false)
    setCenterLocation({
      lat: response.latitude,
      lng: response.longitude,
      label: "You are here",
    });
  }
  const getMediaCategories = async () => {
    const response: any = await RequestService.getMediaCategories();
    setMediaCategories(response.result);
  }

  function getRate(data: any) {
    switch (data.speciality) {
      case 1:
        return data.photograpyrate;
      case 2:
        return data.videograpyrate
      case 3:
        return data.bothrate;
    }
  }

  return (
    <div className="w-100">
        <div className={styles.mapContainer}>
              <MapOverlayComponent center={centerLocation}
                address1={address1} setAddress1={setAddress1} />
              <MapComponent
                key={"" + centerLocation.lat + centerLocation.lng}
                center={centerLocation}
                data={agentsLocation}
                labelKey="firstname"
                address1={address1}
                setAddress1={setAddress1}
                setCenterLocation={setCenterLocation}
                isLoaded={isLoaded}
              />
        </div>
        <div className={`d-flex align-items-center ${styles.filters}`}>
          <div className={`py-2 px-4 ${styles.filterText}`}>Please Select Your Choice Of Photographer</div>
          <div className={styles.formcontrol}>
          <Form.Select name="categories" defaultValue={selectedCategory} onChange={handleCategoryChange}>
                <option value="select">Select Category</option>
                  {
                    mediaCategories.map((category:any)=>(
                      <option value={category.id}>{category.title}</option>
                    ))
                  }
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
              <input type="range" className={`${styles.customRange} w-100`} min={30} max={10000} value={range} onChange={(e) => setRange(e.target.value)} onTouchEnd={onFilterChange} onMouseUp={onFilterChange} />
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
          {loader ?
            <>
              <Skeleton sx={{ transform: 'scale(1)' }} style={{ width: "auto", height: "250px" }} />
              <Skeleton sx={{ transform: 'scale(1)' }} style={{ width: "auto", height: "250px" }} />
              <Skeleton sx={{ transform: 'scale(1)' }} style={{ width: "auto", height: "250px" }} />
              <Skeleton sx={{ transform: 'scale(1)' }} style={{ width: "auto", height: "250px" }} />
            </>
            :
            (agents?.agents.map((item: any) => (
              <AgentCardComponent key={item.id} data={item} />
            )))
          }
        </div>
        
        <div style={{ padding: '15px' }}>
          <Paginations itemPerPage={6} totalItems={agents?.total} currentPage={currentPage} paginate={paginate}></Paginations>
        </div>
    </div>
  );
};

export default RequestComponent;
