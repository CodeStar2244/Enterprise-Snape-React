const MapMarker = ({ text }: any) => {
  return (
    <div className="center">
      <i className="fa-solid fa-location-dot setcolor"></i>
      <div style={{fontWeight: 'bold'}}>{text}</div>
    </div>
  );
};

export default MapMarker;
