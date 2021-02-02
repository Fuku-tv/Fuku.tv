import React, { useState, useEffect } from 'react';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import 'react-tippy/dist/tippy.css';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Annotation } from 'react-simple-maps';
import worldData from '../data/world.json';
import MarkersList from './MarkersList';
// const world = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
const MapOfWorld = (props) => {
	return (
		<React.Fragment>
			<ComposableMap height={!props.isMobile ? 500 : 850} data-tip="" projectionConfig={{ scale: 0 }}>
				<Geographies geography={worldData}>
					{({ geographies }) =>
						geographies.map((geo) => (
							<Geography
								key={geo.rsmKey}
								geography={geo}
								style={{
									default : {
										fill    : '#D6D6DA',
										outline : 'none'
									},
									hover   : {
										fill    : '#F53',
										outline : 'none'
									},
									pressed : {
										fill    : '#E42',
										outline : 'none'
									}
								}}
							/>
						))}
				</Geographies>
				<MarkersList
					activeMapRegion={props.activeMapRegion}
					markerSize={'STATE'}
					loadedPlaces={props.loadedPlaces}
					markers={props.markers}
				/>
			</ComposableMap>
		</React.Fragment>
	);
};

export default MapOfWorld;
