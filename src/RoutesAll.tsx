import {
    Routes,
    Route,
    useNavigationType,
    useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./global.css";
import "./fontawesome/css/all.css"
import Gallery from "./pages/Gallery";
import AddCollection from "./components/Gallery/AddCollection";
import CollectionSetting from "./components/StudioManagement/CollectionSetting";
import PrivacySetting from "./components/StudioManagement/PrivacySetting";
import DownloadStatus from "./components/StudioManagement/DownloadStatus";
import Login from "./pages/Login";
import AssetRegistry from "./pages/AssetRegistry";
import TopBarComponent from "./components/TopBarComponent";
import NavBarComponent from "./components/NavbarComponent";
import Constants from "./Config/Constants";
import Music from "./pages/Music";
import 'react-h5-audio-player/lib/styles.css';
import AssetDeviceList from "./components/AssetRegistry/DeviceList";
import AssetDashboardMain from "./components/AssetRegistry/AssetDashboardMain";
import ForSaleList from "./components/AssetRegistry/ForSaleList";
import MusicDownloads from "./pages/MusicDownloads";
import MusicDownloadList from "./pages/MusicDownloadList";
import DragMedia from "./components/Gallery/DragMedia";
import MusicCollectionList from "./pages/MusicCollectionList";
import MusicCollections from "./pages/MusicCollections";
import Grid from "./components/Grid";
import Collection from "./components/Gallery/Collection";
import LayoutWithSideBar from "./components/LayoutWithSideBar";
import Design from "./components/StudioManagement/Design";
import GetCover from "./components/AssetRegistry/GetCover";
import StudioManagementSide from "./components/StudioManagement/StudioManagementSide";
import Billing from "./pages/Billing";
import BillingSideBar from "./components/StudioManagement/BillingSideBar";
import Setting from "./pages/Setting";
import BillingComponent from "./components/StudioManagement/BillingComponent";
import StudioDashBoard from "./components/StudioManagement/StudioDashBoard";
import ForRentList from "./components/AssetRegistry/ForRentList";
import InsuranceQuoteComponent from "./components/AssetRegistry/InsuranceQuote";
import RequestService from "./pages/RequestService";
import RequestComponent from "./components/RequestService/RequestComponent";
import FavouritesCompoent from "./components/RequestService/FavouritesCompoent";
import BookingsComponent from "./components/RequestService/BookingsComponent";
import AgentDetailComponent from "./components/RequestService/AgentDetailComponent";
import BookAgentComponent from "./components/RequestService/BookAgentForm";


function RoutesAll() {
    return (
        <>
            <TopBarComponent />
            <NavBarComponent />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Setting />} >
                    <Route path="billing" element={<BillingComponent />} />
                </Route>
                <Route path="/request-service" element={<RequestService/>} >
                    <Route path="" element={<RequestComponent/>} />
                    <Route path="profile/:id" element={<AgentDetailComponent />}  />
                    <Route path="favourites" element={<FavouritesCompoent/>} />
                    <Route path="bookings" element={<BookingsComponent/>} />
                    <Route path="book-agent/:id" element={<BookAgentComponent/>} />
                </Route>
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery" element={<LayoutWithSideBar />} >
                    <Route path="/gallery/newcollection" element={<AddCollection />} />
                    <Route path="/gallery/collection/:collectionId" element={<Collection />} />
                    <Route path="/gallery/addcollection/:collectionId" element={<DragMedia />} />
                    <Route path="/gallery/grid/:collectionId" element={<Grid />} />
                    <Route path="/gallery/collection-setting/:collectionId" element={<CollectionSetting />} />
                    <Route path="/gallery/privacy/:collectionId" element={<PrivacySetting />} />
                    <Route path="/gallery/download/:collectionId" element={<DownloadStatus />} />
                    <Route path="/gallery/design/:collectionId" element={<Design />} />
                </Route>
                <Route path="/asset-registry" element={<AssetRegistry />}>
                    <Route path="" element={<AssetDashboardMain />}></Route>
                    <Route path="device-list" element={<AssetDeviceList />}></Route>
                    <Route path="for-sale" element={<ForSaleList />}></Route>
                    <Route path="get-cover" element={<GetCover />}></Route>
                    <Route path="get-cover/:id" element={<InsuranceQuoteComponent/>}></Route>
                    <Route path="for-rent" element={<ForRentList />}></Route>
                </Route>
                <Route path="/music" element={<Music />} />
                <Route path="/music/downloads" element={<MusicDownloadList />} />
                <Route path="/music/collections" element={<MusicCollectionList />} />
                <Route path="/music/downloads/:id" element={<MusicDownloads />} />
                <Route path="/music/collections/:id" element={<MusicCollections />} />
            </Routes>
        </>
    );
}
export default RoutesAll;
