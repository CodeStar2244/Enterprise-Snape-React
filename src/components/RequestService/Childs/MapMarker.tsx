const MapMarker = ({ text }: any) => {
  return (
    <div className="center">
      <i className="fa-solid fa-location-dot setcolor"></i>
      <div>{text}</div>
    </div>
  );
};

export default MapMarker;
