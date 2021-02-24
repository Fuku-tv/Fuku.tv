import * as React from 'react';

import './StoreScreen.scss';
import Screen from 'src/components/UIElements/Screen/Screen';
import useCommerceState from 'src/state/hooks/useCommerceState';
import ScreenNavigation from 'src/components/UIElements/ScreenNavigation/ScreenNavigation';
import StoreItem from './StoreItem/StoreItem';

const StoreScreen: React.FC = () => {
  const { state, actions } = useCommerceState();
  const [activeTab, setActiveTab] = React.useState<string>('Credits');
  const [selectedItem, SetSelectedItem] = React.useState({ price: '', quantity: 0 });
  const checkoutClickEvent = (priceId) => {
    const item = state.productList.find((x) => x.priceId === priceId);
    const lineItems = [
      {
        price: item.priceId,
        quantity: 1,
      },
    ];
    actions.checkout(lineItems);
  };

  const tabList = ['Daily Free', 'Credits', 'Upgrades', 'Prizes'];

  React.useEffect(() => {
    actions.getProducts();
  }, [actions]);

  const comingSoonContent = (
    <>
      <div className="coming-soon-content">
        <div className="title">{activeTab} Coming Soon!</div>
        <div>Please check back again sometime later.</div>
      </div>
    </>
  );

  const creditsContent = (
    <div className="store-item-container">
      {state.productList &&
        state.productList
          .slice(0)
          .reverse()
          .map((i) => <StoreItem key={i.name} coins={i.name} price={i.price} priceId={i.priceId} image={i.imgUrl} onClick={checkoutClickEvent} />)}
    </div>
  );

  return (
    <Screen id="store" title="Store">
      <div className="player-stats-container">
        <div id="level">
          <div className="stat-item-wrapper">
            <span className="player-stats__item">Level:</span>
            <span className="player-stats__value">6</span>
          </div>
          <progress min="0" max="100" value="63" />
        </div>
        <div id="points-and-credits">
          <div className="stat-item-wrapper">
            <span className="player-stats__item">Credits:</span>
            <span className="player-stats__value">15</span>
          </div>
          <div className="stat-item-wrapper">
            <span className="player-stats__item">Points:</span>
            <span className="player-stats__value">1540</span>
          </div>
        </div>
      </div>
      <div className="screen-navigation">
        {tabList.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            onKeyDown={() => setActiveTab(activeTab)}
            className={`applied-item__title ${activeTab === tab && 'active'}`}
          >
            <h2>{tab}</h2>
          </button>
        ))}
      </div>
      {activeTab === 'Credits' ? creditsContent : comingSoonContent}
    </Screen>
  );
};
const StoreItemRow = (props) => (
  <div id="store-item-row">
    <div className="dynamic-number">
      <span>{props.coins}</span>
    </div>
    <div className="store__price">${props.price}</div>

    <FlatButton text="Purchase" onClick={() => props.onClick(props.priceId)} />
  </div>
);

export default StoreScreen;
