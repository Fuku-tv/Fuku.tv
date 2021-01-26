import * as React from 'react';
import FlatButton from 'src/shared/components/UIElements/FlatButton/FlatButton';
import './Store.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from '../UserProfile/components/ProfileImage/ProfileImage';

const Store: React.FC = () => {
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
				{SAMPLE_STOREITEM_DATA.map((i) => <StoreItemRow coins={i.coins} price={i.price} />)}
			</div>
			<div id="current-credits" className="dynamic-number">
				<span>Current Credits:</span>
				<span>10</span>
			</div>
		</section>
	);
};

export default Store;
const StoreItemRow = (props) => {
	return (
		<div id="store-item-row">
			<div className="dynamic-number">
				<span>{props.coins}</span>
				<span>Coins</span>
			</div>
			<div className="store__price">${props.price}</div>
			<FlatButton text="Purchase" slim />
		</div>
	);
};
