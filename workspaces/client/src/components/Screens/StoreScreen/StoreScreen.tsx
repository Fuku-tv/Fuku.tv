import * as React from 'react';
import './StoreScreen.scss';
import Screen from 'src/components/UIElements/Screen/Screen';
import useCommerceState from 'src/state/hooks/useCommerceState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import LoadingSpinner from 'src/components/UIElements/LoadingSpinner/LoadingSpinner';
import { useAuthState, usePrizeState } from 'src/state/hooks';
import StoreItem from './StoreItem/StoreItem';
import GiftCard20 from './images/amazon-gift-card-20-dollar.png';
import GiftCard50 from './images/amazon-gift-card-50-dollar.png';
import GiftCard100 from './images/amazon-gift-card-100-dollar.png';
import StoreTabPrizes from './StoreTabPrizes/StoreTabPrizes';
import StoreTabCredits from './StoreTabCredits/StoreTabCredits';

const StoreScreen: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('Credits');

  const tabList = ['Daily Free', 'Credits', 'Upgrades', 'Prizes'];

  // SCREEN TAB CONTENT
  const comingSoonContent = (
    <>
      <div className="coming-soon-content">
        <div className="title">{activeTab} Coming Soon!</div>
        <div>Please check back again sometime later.</div>
      </div>
    </>
  );

  const tabs = activeTab === 'Credits' ? <StoreTabCredits /> : <StoreTabPrizes />;
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
