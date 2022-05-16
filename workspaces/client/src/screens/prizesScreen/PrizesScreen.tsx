import * as React from 'react';

import './PrizesScreen.scss';
import Screen from 'src/components/UIElements/Screen/Screen';

const PrizesScreen: React.FC = () => {
  const SAMPLE_PRIZE_DATA = [
    {
      title: 'Prize Item Title',
      image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif',
    },
    {
      title: 'Prize Item Title',
      image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif',
    },
    {
      title: 'Prize Item Title',
      image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif',
    },
    {
      title: 'Prize Item Title',
      image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif',
    },
    {
      title: 'Prize Item Title',
      image: 'https://images-na.ssl-images-amazon.com/images/I/719YGBTCR2L._AC_SY1000_.gif',
    },
  ];

  return (
    <Screen id="prizes" title="Prizes">
      <section id="prizes-tab-section">
        <div className="prizes-item-container">
          {SAMPLE_PRIZE_DATA.map((prize) => (
            <PrizeItem key={prize.title} title={prize.title} image={prize.image} />
          ))}
        </div>
      </section>
    </Screen>
  );
};

export default PrizesScreen;

const PrizeItem = (props) => (
  <div className="prize-item">
    <div className="prize-item__image">
      <img src={props.image} alt="" />
    </div>
    <div className="prize-item__title">
      <div className="user__name">{props.title}</div>
    </div>
  </div>
);
