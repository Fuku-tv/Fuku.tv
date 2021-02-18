import * as React from 'react';
import './ContentContainer.scss';

const ContentContainer: React.FC = (props) => {
	return <div className="outer-content-wrapper">{props.children}</div>;
};

export default ContentContainer;
