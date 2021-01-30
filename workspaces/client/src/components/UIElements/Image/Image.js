import React from 'react';
import './Image.css';
const Image = (props) => {
	return (
		<div className="image-wrapper">
			<img src={props.src} alt={props.alt} />
		</div>
	);
};

export default Image;
