import * as React from 'react';

import './Store.scss';
import useAuthState from 'src/state/hooks/useAuthState';
import ProfileImage from '../UserProfile/components/ProfileImage/ProfileImage';

const Store: React.FC = () => {
  const { state, actions } = useAuthState();
  const SAMPLE_STOREITEM_DATA = [
    {
      coins: '5',
      price: '1.00',
    },
    {
      coins: '10',
      price: '1.75',
    },
    {
      coins: '15',
      price: '2.50',
    },
    {
      coins: '20',
      price: '3.25',
    },
    {
      coins: '25',
      price: '4.00',
    },
    {
      coins: '30',
      price: '4.50',
    },
  ];

  return (
    <section id="store-section">
      <div className="header">
        <h2 className="sidenav-title">Store</h2>
        <div id="header-current-credits" className="dynamic-number">
          <span>Current Credits:</span>
          <span>10</span>
        </div>
      </div>

      <div className="store-table">
        {SAMPLE_STOREITEM_DATA.map((i) => (
          <StoreItemRow key={Math.random()} coins={i.coins} price={i.price} />
        ))}
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
      <button>Purchase</button>
    </div>
  );
};
