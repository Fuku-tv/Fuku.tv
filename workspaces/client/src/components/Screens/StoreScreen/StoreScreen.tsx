import * as React from 'react';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import './StoreScreen.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from 'src/components/UIElements/ProfileImage/ProfileImage';

const StoreScreen: React.FC = () => {
	const { state, actions } = useAuthState();
	const SAMPLE_STOREITEM_DATA = [
		{
			coins: '5',
			price: '1.00'
		},
		{
			coins: '10',
			price: '1.75'
		},
		{
			coins: '15',
			price: '2.50'
		},
		{
			coins: '20',
			price: '3.25'
		},
		{
			coins: '25',
			price: '4.00'
		},
		{
			coins: '30',
			price: '4.50'
		}
	];

	return (
		<section id="store-section">
			<div className="store-table">
				{SAMPLE_STOREITEM_DATA.map((i) => <StoreItemRow key={i} coins={i.coins} price={i.price} />)}
			</div>
			<div id="current-credits" className="dynamic-number">
				<span>Current Credits:</span>
				<span>10</span>
			</div>
		</section>
	);
};

export default StoreScreen;
const StoreItemRow = (props) => {
	return (
		<div id="store-item-row">
			<div className="dynamic-number">
				<span>{props.coins}</span>
				<span>Coins</span>
			</div>
			<div className="store__price">${props.price}</div>
			{/* //TODO add function soon */}
			<FlatButton text="Purchase" onClick={() => {}} />
		</div>
	);
};
