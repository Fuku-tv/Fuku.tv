import * as React from 'react';

import './StoreScreen.scss';
import Screen from 'src/components/UIElements/Screen/Screen';
import useCommerceState from 'src/state/hooks/useCommerceState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import LoadingSpinner from 'src/components/UIElements/LoadingSpinner/LoadingSpinner';
import StoreItem from './StoreItem/StoreItem';

const StoreScreen: React.FC = () => {
  const { state, actions } = useCommerceState();
  const [activeTab, setActiveTab] = React.useState<string>('Credits');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SCREEN TAB CONTENT
  const comingSoonContent = (
    <>
      <div className="coming-soon-content">
        <div className="title">{activeTab} Coming Soon!</div>
        <div>Please check back again sometime later.</div>
      </div>
    </>
  );

  const prizesContent = (
    <div className="store-item-container">
      <article id="prize" className="store-item">
        <div className="store-item__price">1000 Points</div>
        <div className="image-wrapper">
          <img src="https://gamecardsdirect.com/content/picture/23009/amazon-gift-card-20-dollar.jpg" alt="" />
        </div>
        <div className="store-item__credits">
          <div className="credits__title">
            <h3>$20 Amazon Gift Card</h3>
          </div>
          <FlatButton width={220} text="Redeem Prize" />
        </div>
      </article>
    </div>
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

  const tabs = activeTab === 'Credits' ? creditsContent : prizesContent;
  return (
    <Screen id="store" title="Store">
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
      {activeTab === 'Credits' || activeTab === 'Prizes' ? tabs : comingSoonContent}
    </Screen>
  );
};

export default StoreScreen;
