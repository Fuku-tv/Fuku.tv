import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Annotation } from 'react-simple-maps';
import MarkersList from './MarkersList';
import { geoCentroid } from 'd3-geo';
import usaData from '../data/usa.json';
import statesData from '../data/states.json';
import allStates from '../../../../../data/allStates.json';

const MapOfUsa = (props) => {
  const [stateCoords, setStateCoords] = useState([-74.9384, 42.1497]);
  const [usMarkers, setUsMarkers] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const offsets = {
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21],
  };

  useEffect(() => {
    // console.log('markers', props.markers);
    let LAT_MAX = 50;
    let LAT_MIN = 24;
    let LNG_MAX = -65;
    let LNG_MIN = -125;
    let newMarkers = props.markers.filter(
      (marker) =>
        marker.coordinates[0] >= LNG_MIN && marker.coordinates[0] <= LNG_MAX && marker.coordinates[1] <= LAT_MAX && marker.coordinates[1] >= LAT_MIN
    );

    let coords = [];
    let zoom;
    console.log('all state data', statesData);
    const state = statesData.filter((state) => state.state === props.usStateName);
    coords.push(state[0].longitude, state[0].latitude);
    zoom = state[0].zoom;
    console.log('coords', state);
    setStateCoords(coords);
    setZoomLevel(zoom);
    setUsMarkers(newMarkers);
  }, [props]);
  return (
    <React.Fragment>
      <ComposableMap
        projectionConfig={{
          rotate: [58, 20, 0],
          // scale  : 3500
        }}
        height={!props.isMobile ? 500 : 850}
        projection="geoAlbersUsa"
      >
        <ZoomableGroup center={stateCoords} x={400} zoom={zoomLevel}>
          <Geographies geography={usaData}>
            {({ geographies }) =>
              geographies
                .filter((g) => g.properties.name === props.usStateName)
                .map((geo) => <Geography key={geo.rsmKey} stroke="#FFF" geography={geo} fill="#DDD" />)
            }
          </Geographies>
          <Geographies geography={usaData}>
            {({ geographies }) =>
              function () {
                const geo = geographies[7];
                console.log('geo', geo);
                const centroid = geoCentroid(geo);
                const cur = allStates.find((s) => s.val === geo.id);
                return (
                  <g key={geo.rsmKey + '-name'}>
                    <Annotation subject={centroid} dx={offsets[cur.id][0]} dy={offsets[cur.id][1]}>
                      <text x={4} fontSize={14} alignmentBaseline="middle">
                        {cur.id}
                      </text>
                    </Annotation>
                  </g>
                );
              }
            }
          </Geographies>
          <MarkersList activeMapRegion={props.activeMapRegion} loadedPlaces={props.loadedPlaces} markers={usMarkers} />
        </ZoomableGroup>
      </ComposableMap>
    </React.Fragment>
  );
};

export default MapOfUsa;
// 		const kansas = {
// 			geometry: {type: "Polygon", coordinates: Array(1)}
// id: "20"
// properties: {name: "Kansas"}
// rsmKey: "geo-7"
// svgPath: "M191.
// type: "Feature"
// __proto__: Object
// 		}
// <Geography key={geographies[7].rsmKey} stroke="#FFF" geography={geographies[7]} fill="#DDD" />
