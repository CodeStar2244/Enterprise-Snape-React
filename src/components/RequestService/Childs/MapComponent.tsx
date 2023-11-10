import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";
import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  DirectionsRenderer,
  LoadScript,
} from '@react-google-maps/api';
import { useEffect } from "react";
import axios from "axios";

interface MapProp {
  center: {
    lat: number;
    lng: number;
    label: string;
  };
  zoom?: number;
  data: any[];
  labelKey: string;
  address1: string;
  setAddress1: any;
  setCenterLocation: any;
  isLoaded: boolean
}


const MapComponent = (props: MapProp) => {
  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const center = {
    lat: props.center?.lat,
    lng: props.center?.lng
  };

  if (props.isLoaded) {
    const options = {
      types: ['geocode'],
    };
    const input = document.getElementById('autocomplete-input');
    const autoComplete = new window.google.maps.places.Autocomplete(input as any, options);

    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();
      if (!place.geometry) {
        console.log('No location data available for this place');
        return;
      }
      props.setAddress1(place.formatted_address);
      props.setCenterLocation({ lat: place.geometry.location?.lat(), lng: place.geometry.location?.lng() })
    });

  }
  const onMapLoad = (map:any) => {
    let marker = new google.maps.Marker({
    position: center,
    map: map,
    draggable: true,
  })
  marker.addListener('dragend', async function (e:any) {
     const address = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${e?.latLng?.lat()},${e?.latLng?.lng()}&key=AIzaSyDHF0s5msU1ffUR_JqjAnC90mYMAxkDfE4`);
     props.setCenterLocation({lat:e?.latLng.lat(),lng:e?.latLng.lng()});
     props.setAddress1(address.data.results[0].formatted_address)

  })  }
  return props.isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onMapLoad}
      options={{
        draggable: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl:false
      }}
    >
      {props.data.map((point: any, index) => (<MarkerF
          position={{lat:point?.latitude,lng:point?.longitude}}
        />)
      )}
    </GoogleMap>
  ) : <></>
}

export default MapComponent;
