import React, { useState, useEffect } from 'react';
import { ReactComponent as SortDown } from '../../../../icons/sort-down.svg';
import { ReactComponent as SortUp } from '../../../../icons/sort-up.svg';
import '../css/MapSwitcher.css';

import usaData from '../data/states.json';
const MapSwitcher = (props) => {
	const [ stateSelectIsActive, setStateSelectIsActive ] = useState(false);
	const [ stateName, setStateName ] = useState();
	const handleStateSelect = (state) => {
		setStateName(state);
		setStateSelectIsActive(false);
		props.updateStateHandler(state)
	};


	const stateHandler=(state)=>{
		// setStateName(state);
		if(props.activeMapRegion === 'STATE'){

			setStateSelectIsActive((a) => !a);
		}
		props.mapSwitcherHandler('STATE', 'mapOfUSA')
	}
	// ((a) => !a)}
	useEffect(
		() => {
			console.log(usaData);
			setStateName(props.usStateName);
		},
		[ props ]
	);
	return (
		<div className={`map-switcher-container ${props.usStateName ? 'three-col' : 'two-col'}`}>
			{props.usStateName && (
				<div className="state-container">
					<button
						onClick={stateHandler}
						className={`map-switcher-button ${props.activeMapRegion === 'STATE' && '--active'}`}
					>
						{stateName}
					</button>
					{props.activeMapRegion === 'STATE' && (
						<div className="change-state-button">
							{stateSelectIsActive && props.activeMapRegion === 'STATE' ? <SortUp /> : <SortDown />}
						</div>
					)}

					{stateSelectIsActive && (
						<div className="state-dropdown-container">
							{usaData.map((state) => (
								<span
									onClick={() => handleStateSelect(state.state)}
									class="state-option"
									id={state.state}
								>
									{state.state}
								</span>
							))}
						</div>
					)}
				</div>
			)}

			<button
				onClick={() => props.mapSwitcherHandler('USA', 'mapOfUSA')}
				className={`map-switcher-button ${props.activeMapRegion === 'USA' && '--active'}`}
			>
				USA
			</button>
			<button
				onClick={() => props.mapSwitcherHandler('WORLD', 'mapOfWorld')}
				className={`map-switcher-button ${props.activeMapRegion === 'WORLD' && '--active'}`}
			>
				World
			</button>
		</div>
	);
};

export default MapSwitcher;
