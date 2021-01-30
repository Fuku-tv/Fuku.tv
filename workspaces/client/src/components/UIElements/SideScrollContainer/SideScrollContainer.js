import React from 'react';
import './SideScrollContainer.css';

const SideScrollContainer = (props) => {
	return <div className="side-scroll-container">{props.children}</div>;
};

export default SideScrollContainer;
