import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import AgentCardComponent from "./Childs/CardComponent";
import MapComponent from "./Childs/MapComponent";
import styles from "./RequestStyle.module.css";
import Paginations from "../Pagination/Pagination";
import RequestService from "../../api/request-service/requestService";

const RequestComponent = () => {
  const testData = [
    {
      id: 1,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 1",
      profession: "Developer",
      cost: 1001,
      joinedDate: "20 March 2023",
      projectsCount: 57,
      experienceLevel: "Mid-level",
      isFavourite: true,
    },
    {
      id: 95,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 2",
      profession: "Designer",
      cost: 1452,
      joinedDate: "20 March 2023",
      projectsCount: 23,
      experienceLevel: "Junior",
      isFavourite: false,
    },
    {
      id: 3,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 3",
      profession: "Writer",
      cost: 1358,
      joinedDate: "20 March 2023",
      projectsCount: 89,
      experienceLevel: "Senior",
      isFavourite: true,
    },
    {
      id: 4,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 4",
      profession: "Engineer",
      cost: 1047,
      joinedDate: "20 March 2023",
      projectsCount: 37,
      experienceLevel: "Junior",
      isFavourite: false,
    },
    {
      id: 5,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 5",
      profession: "Artist",
      cost: 1536,
      joinedDate: "20 March 2023",
      projectsCount: 64,
      experienceLevel: "Mid-level",
      isFavourite: true,
    },
    {
      id: 6,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 6",
      profession: "Developer",
      cost: 1008,
      joinedDate: "20 March 2023",
      projectsCount: 91,
      experienceLevel: "Senior",
      isFavourite: true,
    },
    {
      id: 7,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 7",
      profession: "Writer",
      cost: 1062,
      joinedDate: "20 March 2023",
      projectsCount: 75,
      experienceLevel: "Junior",
      isFavourite: false,
    },
    {
      id: 8,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 8",
      profession: "Designer",
      cost: 1112,
      joinedDate: "20 March 2023",
      projectsCount: 14,
      experienceLevel: "Senior",
      isFavourite: true,
    },
    {
      id: 9,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 9",
      profession: "Developer",
      cost: 1374,
      joinedDate: "20 March 2023",
      projectsCount: 42,
      experienceLevel: "Mid-level",
      isFavourite: false,
    },
    {
      id: 10,
      profileImage: "./temp/profile.png",
      backgroundImage: "./temp/background.png",
      userName: "User 10",
      profession: "Engineer",
      cost: 1216,
      joinedDate: "20 March 2023",
      projectsCount: 68,
      experienceLevel: "Junior",
      isFavourite: true,
    },
  ];

  useEffect(() => {
    getAgentLocations();
    getLocation();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [agentsLocation, setAgentsLocation] = useState([]);
  const [centerLocation, setCenterLocation] = useState({
    lat: 0,
    lng: 0,
    label: "",
  });

  const updateFilter = () => {};

  const paginate = (e: any) => {
    console.log(e);
  };

  const getAgentLocations = async () => {
    const result = await RequestService.getAgents({
      range: 10000,
      latitude: 22.9952824,
      longitude: 72.6194261,
      page: 1,
      limit: 6,
    });
    setAgentsLocation(result.result?.agents || []);
  };
  const getLocation = async () => {
    const response: any = await RequestService.getCurrentLocation();
    console.log(response);
    setCenterLocation({
      lat: response.latitude,
      lng: response.longitude,
      label: "You are here",
    });
  };

  return (
    <div className={styles.mainContainer}>
      {centerLocation.lat ? (
        <div className={styles.mapContainer}>
          <MapComponent
            key={"" + centerLocation.lat + centerLocation.lng}
            center={centerLocation}
            data={agentsLocation}
            labelKey="email"
            />
        </div>
      ) : (
        ""
      )}
      <div className={`d-flex align-items-center ${styles.filters}`}>
        <div className={`py-2 px-4 ${styles.filterText}`}>Please Select Your Choice Of Photographer</div>
        <div className={styles.formcontrol}>
          <Form.Select name="categories" defaultValue="" onChange={updateFilter}>
            <option value="">Categories</option>
            <option value="photographer">Photographer</option>
            <option value="videographer">Videographer</option>
            <option value="both">Both</option>
          </Form.Select>
        </div>
        <div className={styles.formcontrol}>
          <Form.Select name="filter" defaultValue="" onChange={updateFilter}>
            <option value="">Filter</option>
          </Form.Select>
        </div>
        <div className={styles.formcontrol}>
          <Form.Select name="sort" defaultValue="" onChange={updateFilter}>
            <option value="">Sort</option>
          </Form.Select>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {testData.map((item) => (
          <AgentCardComponent key={item.id} data={item} />
        ))}
      </div>

      <Paginations itemPerPage={2} totalItems={11} currentPage={currentPage} paginate={paginate}></Paginations>
    </div>
  );
};

export default RequestComponent;
