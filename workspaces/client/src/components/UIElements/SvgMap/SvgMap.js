import React, { useState, useEffect } from 'react';

import { useHttpClient } from '../../../hooks/http-hook';
import ErrorModal from '../../../components/UIElements/ErrorModal/ErrorModal';

import MapOfWorld from './Components/MapOfWorld';
import MapOfUsa from './Components/MapOfUsa';
import MapOfState from './Components/MapOfState';
import MapSwitcher from './Components/MapSwitcher';

import './SvgMap.css';

//individuals
const world = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

//////////////////////////////////////////////////////////////////

const SvgMap = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [ activeMapRegion, setActiveMapRegion ] = useState('USA');
	const [ geoUrl, setGeoUrl ] = useState(world);

	const [ usStateName, setUsStateName ] = useState();
	const [ loadedPlaces, setLoadedPlaces ] = useState([]);
	const [ markers, setMarkers ] = useState([]);

	const mapSwitcherHandler = (region, url) => {
		setActiveMapRegion(region);
	};

	const getLocation = () => {
		if (!navigator.geolocation) {
			console.log('Geolocation is not supported by your browser');
			return;
		}

		function success(position) {
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;

			reverseGeocodingWithGoogle(longitude, latitude);
			console.log(process.env.REACT_APP_GOOGLE_API_KEY);
			// console.log(lng, lat);
		}

		function error() {
			console.log('Unable to retrieve your location');
		}

		// let stateName;
		function reverseGeocodingWithGoogle(latitude, longitude) {
			fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${longitude},${latitude}&key=${process.env
					.REACT_APP_GOOGLE_API_KEY}`
			)
				.then((res) => res.json())
				.then((response) => {
					console.log(
						"User's Location Info: ",
						response.results[response.results.length - 2].address_components[0].long_name
					);
					let stateName = response.results[response.results.length - 2].address_components[0].long_name;
					setUsStateName(stateName);
				})
				.catch((status) => {
					console.log('Request failed.  Returned status of', status);
				});
		}
		navigator.geolocation.getCurrentPosition(success, error);
		// console.log('sdasd', stateName);
		// setUsStateName(stateName);
	};

	const updateStateHandler = (state) => {
		setUsStateName(state)
	}

	const mapSwitcher = (
		<MapSwitcher
			mapSwitcherHandler={mapSwitcherHandler}
			activeMapRegion={activeMapRegion}
			usStateName={usStateName}
			updateStateHandler={updateStateHandler}
		/>
	);

	const mapOfWorld = (
		<MapOfWorld
			activeMapRegion={activeMapRegion}
			isMobile={props.isMobile}
			loadedPlaces={loadedPlaces}
			markers={markers}
		/>
	);
	const mapOfUSA = (
		<MapOfUsa
			activeMapRegion={activeMapRegion}
			isMobile={props.isMobile}
			loadedPlaces={loadedPlaces}
			markers={markers}
		/>
	);
	const mapOfState = (
		<MapOfState
			activeMapRegion={activeMapRegion}
			usStateName={usStateName}
			isMobile={props.isMobile}
			loadedPlaces={loadedPlaces}
			markers={markers}
		/>
	);

	useEffect(
		() => {
			console.log('running');
			// if (!isLoading) return 'loading';
			const fetchPlaces = async () => {
				try {
					const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`);
					console.log(responseData.places);
					console.log(responseData.places.map((p) => p.location.lng));
					let locationMarkers = [];

					responseData.places.map((p) =>
						locationMarkers.push({
							id           : p.id,
							markerOffset : -26,
							name         : p.title,
							coordinates  : [ p.location.lng, p.location.lat ]
						})
					);

					setLoadedPlaces(responseData.places);
					console.log('places - map', responseData.places);
					setMarkers(locationMarkers);
				} catch (err) {
					console.log('err', err.message);
				}
			};
			// mapSwitcherHandler('USA', mapOfUSA);
			getLocation();
			fetchPlaces();
		},
		[ sendRequest ]
	);

	// const [ mapType, setMapType ] = useState(mapOfWorld);

	const getMap = (activeMapRegion) => {
		switch (activeMapRegion) {
			case 'STATE':
				return mapOfState;

			case 'USA':
				return mapOfUSA;

			case 'WORLD':
				return mapOfWorld;

			default:
				return mapOfUSA;
		}
	};
	return (
		<div className="svg-map-container">
			<ErrorModal error={error} onClear={clearError} />
			<div className="map-content-container">
				<h2>{props.title}</h2>
				{mapSwitcher}
			</div>

			{getMap(activeMapRegion)}
		</div>
	);
};

// const LocationDetailsBox = (props) => {
// 	return (
// 		<div className="location-detail-containerx">
// 			<div id="cross-wrapperx" onClick={() => props.setLocationDetailsIsOpen(false)} className="close-btn" />
// 			<h3>{props.locationDetails && props.locationDetails[0].title}</h3>
// 			<p id="address">{props.locationDetails && props.locationDetails[0].address}</p>
// 			<p id="description">{props.locationDetails && props.locationDetails[0].description}</p>
// 		</div>
// 	);
// };

export default SvgMap;

// <LocationDetailsBox
// 					locationDetails={locationDetails}
// 					setLocationDetailsIsOpen={setLocationDetailsIsOpen}
// 				/>

// const usamap = (
// 	<ZoomableGroup zoom={1}>
// 		<Geographies geography={geoUrl}>
// 			{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}
// 		</Geographies>
// 		{markers.map(({ id, name, coordinates, markerOffset }) => (
// 			<Marker onClick={() => locationDetailsHandler(id)} key={name} coordinates={coordinates}>
// 				<g
// 					className="icon-scale"
// 					id={id}
// 					fill="none"
// 					stroke="#FF5533"
// 					strokeWidth="2"
// 					strokeLinecap="round"
// 					strokeLinejoin="round"
// 					transform="translate(-12, -24)"
// 				>
// 					<circle cx="12" cy="10" r="3" />
// 					<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
// 				</g>
// 				<text textAnchor="middle" y={markerOffset} style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}>
// 					{name}
// 				</text>
// 			</Marker>
// 		))}
// 	</ZoomableGroup>
// );

// const normalMap = (
// 	<React.Fragment>
// 		<Geographies geography={usa}>
// 			{({ geographies }) =>
// 				geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF" />)}
// 		</Geographies>
// 		{markers.map(({ id, name, coordinates, markerOffset }) => (
// 			<Marker onClick={() => locationDetailsHandler(id)} key={name} coordinates={coordinates}>
// 				<g
// 					className="icon-scale"
// 					id={id}
// 					fill="none"
// 					stroke="#FF5533"
// 					strokeWidth="2"
// 					strokeLinecap="round"
// 					strokeLinejoin="round"
// 					transform="translate(-12, -24)"
// 				>
// 					<circle cx="12" cy="10" r="3" />
// 					<path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
// 				</g>
// 				<text textAnchor="middle" y={markerOffset} style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}>
// 					{name}
// 				</text>
// 			</Marker>
// 		))}
// 	</React.Fragment>
// );
