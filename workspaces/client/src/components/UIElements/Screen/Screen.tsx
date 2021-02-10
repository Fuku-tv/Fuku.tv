import * as React from 'react';
import ContentContainer from '../ContentContainer/ContentContainer';

// import './AboutScreen.scss';
interface PROPS {
	id: string;
	title: string;
}

const Screen: React.FC<PROPS> = (props) => {
	return (
		<section id={`${props.id}-screen`}>
			<h1>{props.title}</h1>
			<ContentContainer>{props.children}</ContentContainer>
		</section>
	);
};

export default Screen;
