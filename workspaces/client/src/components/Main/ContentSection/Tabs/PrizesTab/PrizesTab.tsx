import * as React from 'react';

import './PrizesTab.scss';
import useAuthState from 'src/state/hooks/useAuthState';

const PrizesTab: React.FC = () => {
	const { state, actions } = useAuthState();

	const SAMPLE_PRIZE_DATA = [
		{
			title: 'Prize Item Title',
			image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif'
		},
		{
			title: 'Prize Item Title',
			image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif'
		},
		{
			title: 'Prize Item Title',
			image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif'
		},
		{
			title: 'Prize Item Title',
			image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif'
		},
		{
			title: 'Prize Item Title',
			image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif'
		}
	];

	return (
		<section id="prizes-tab-section">
			<div className="prizes-item-container">
				{SAMPLE_PRIZE_DATA.map((prize) => <PrizeItem title={prize.title} image={prize.image} />)}
			</div>
		</section>
	);
};

export default PrizesTab;

const PrizeItem = (props) => {
	return (
		<div className="prize-item">
			<div className="prize-item__image">
				<img src={props.image} alt="" />
			</div>
			<div className="prize-item__title">
				<div className="user__name">{props.title}</div>
			</div>
		</div>
	);
};
