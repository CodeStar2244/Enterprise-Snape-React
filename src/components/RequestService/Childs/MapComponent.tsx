import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

interface MapProp {
  center: {
    lat: number;
    lng: number;
    label: string;
  };
  zoom?: number;
  data: any[];
  labelKey: string;
}

const MapComponent = (props: MapProp) => {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyDHF0s5msU1ffUR_JqjAnC90mYMAxkDfE4" }}
      defaultCenter={props.center}
      defaultZoom={props.zoom || 16}
    >
      <MapMarker lat={props.center.lat} lng={props.center.lng} text={props.center.label} />
      {props.data.map((point: any, index) => (
        <MapMarker key={index} lat={point.latitude} lng={point.longitude} text={point[props.labelKey]} />
      ))}
    </GoogleMapReact>
  );
};

export default MapComponent;
