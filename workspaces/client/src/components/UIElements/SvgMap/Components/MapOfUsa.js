import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, Annotation } from 'react-simple-maps';
import MarkersList from './MarkersList';
import { geoCentroid } from 'd3-geo';
import usaData from '../data/usa.json';

import allStates from '../../../../../data/allStates.json';
// const usaIso = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const MapOfUsa = (props) => {
  const [usMarkers, setUsMarkers] = useState([]);
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
    console.log('markers', props.markers);
    let LAT_MAX = 50;
    let LAT_MIN = 24;
    let LNG_MAX = -65;
    let LNG_MIN = -125;
    let newMarkers = props.markers.filter(
      (marker) =>
        marker.coordinates[0] >= LNG_MIN && marker.coordinates[0] <= LNG_MAX && marker.coordinates[1] <= LAT_MAX && marker.coordinates[1] >= LAT_MIN
    );
    console.log('newMarkers', newMarkers);
    setUsMarkers(newMarkers);
  }, [props]);
  return (
    <React.Fragment>
      <ComposableMap
        projectionConfig={{
          rotate: [58, 20, 0],
          scale: 900,
        }}
        height={!props.isMobile ? 500 : 850}
        projection="geoAlbersUsa"
      >
        <Geographies geography={usaData}>
          {({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} stroke="#FFF" geography={geo} fill="#DDD" />)}
        </Geographies>
        <Geographies geography={usaData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + '-name'}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation subject={centroid} dx={offsets[cur.id][0]} dy={offsets[cur.id][1]}>
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })
          }
        </Geographies>
        <MarkersList activeMapRegion={props.activeMapRegion} loadedPlaces={props.loadedPlaces} markers={usMarkers} />
      </ComposableMap>
    </React.Fragment>
  );
};

export default MapOfUsa;
