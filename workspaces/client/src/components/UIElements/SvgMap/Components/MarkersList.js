import React, { useState, useEffect } from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'react-tippy/dist/tippy.css';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Annotation } from 'react-simple-maps';
const MarkersList = (props) => {
	const [ markers, setMarkers ] = useState();
	const [ markerSize, setMarkerSize ] = useState();
	const tooltipContent = (id) => {
		// console.log('markers', props.markers);
		let location;
		location = props.loadedPlaces.filter((p) => p.id === id);
		let title = location[0].title;
		let description = location[0].description;
		let address = location[0].address;
		// console.log('location', location);
		let content = (
			<div>
				<div style={{ fontWeight: 'bold' }}>{title}</div>
				<div style={{ fontSize: '12px' }}>{address}</div>
				<div style={{ fontSize: '12px', marginTop: '10px' }}>{description}</div>
			</div>
		);
		return content;
	};

	useEffect(
		() => {
			const stateMarkerSize = 'translate(-2, -9)  scale(.4)';
			const markerSize = 'translate(-12, -24)';
			if (props.activeMapRegion === 'STATE') {
				setMarkerSize(stateMarkerSize);
			} else {
				setMarkerSize(markerSize);
			}
		},
		[ props ]
	);
	return (
		<React.Fragment>
			{props.markers.map((marker) => (
				<Marker key={marker.name} coordinates={marker.coordinates} fill="blue">
					<Tippy content={tooltipContent(marker.id)}>
						<g
							className="icon-scale"
							id={marker.id}
							fill="none"
							stroke="#FF5533"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							transform={markerSize}
						>
							<path fill="#dddddd" d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
							<circle stroke="#FF5533" fill="#dddddd" cx="12" cy="10" r="3" />
						</g>
					</Tippy>
				</Marker>
			))}
		</React.Fragment>
	);
};

export default MarkersList;
