import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./global.css";
import "./fontawesome/css/all.css"
import Login from "./pages/Login";
import 'react-h5-audio-player/lib/styles.css';
import RoutesAll from "./RoutesAll";
import { getUserToken } from "./Utils/helper";
import GalleryClientView from "./pages/GalleryClientView";
import Register from "./pages/Register";


function App() {
  const accessToken = getUserToken();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/view/:slug" element={<GalleryClientView/>}/>
        <Route path="/*" element={<RoutesAll />} /> 
      </Routes>
    </>
  );
}
export default App;
