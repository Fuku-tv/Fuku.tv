import React, { useRef, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript, useLoadScript } from '@react-google-maps/api';
import mapColor from './mapColor.js';
import mapStyles from './mapStyles.json';
import './Map.css';

const Map = (props) => {
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
  };

  const libraries = ['places'];

  const { center, zoom } = props;

  const options = {
    styles: mapColor,
    disableDefaultUI: true,
  };

  // const { isLoaded, loadError } = useLoadScript({
  // 	googleMapsApiKey : process.env.REACT_APP_GOOGLE_API_KEY,
  // 	libraries        : libraries
  // });

  // if (loadError) return 'Error Loading Maps';
  // if (!isLoaded) return 'Loading Maps';
  // <Marker key={Math.random()} position={center} />
  return (
    <div className="map">
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={center} options={options}>
        {props.markers &&
          props.markers.map((marker) => <Marker key={Math.random()} position={{ lat: marker.location.lat, lng: marker.location.lng }} />)}
      </GoogleMap>
    </div>
  );
};

export default Map;

// const mapContainerStyle = {
// 	width  : '100%',
// 	height : '100%'
// };
// const centerUSA = {
// 	lat : 39.678957,
// 	lng : -94.877002
// };

// const libraries = [ 'places' ];

// const Map = (props) => {
// 	const { center, zoom } = props;

// 	const [ markers, setMarkers ] = useState([]);
// 	const { isLoaded, loadError } = useLoadScript({
// 		googleMapsApiKey : process.env.REACT_APP_GOOGLE_API_KEY,
// 		libraries        : libraries
// 	});

// 	if (loadError) return 'Error Loading Maps';
// 	if (!isLoaded) return 'Loading Maps';

// 	return (
// 		<div className="map">
// 			<GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={center}>
// 				<Marker key={Math.random()} position={center} />
// 			</GoogleMap>
// 		</div>
// 	);
// };

// WORKING

// const Map = (props) => {
// 	const mapRef = useRef();

// 	const { center, zoom } = props;

// 	useEffect(
// 		() => {
// 			const map = new window.google.maps.Map(mapRef.current, {
// 				center : center,
// 				zoom   : zoom
// 			});

// 			new window.google.maps.Marker({ position: center, map: map });
// 		},
// 		[ center, zoom ]
// 	);

// 	return <div ref={mapRef} className="map" />;
// };

// export default Map;
