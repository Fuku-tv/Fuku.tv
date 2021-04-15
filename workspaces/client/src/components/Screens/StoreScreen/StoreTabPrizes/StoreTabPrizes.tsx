import * as React from 'react';
// import './StoreTabPrizes.scss';

import { useGameState, useAuthState, usePrizeState } from 'src/state/hooks';
import StoreItem from '../StoreItem/StoreItem';
import GiftCard10 from './images/amazon-10.png';
import GiftCard25 from './images/amazon-25.png';
import GiftCard50 from './images/amazon-50.png';
import GiftCard100 from './images/amazon-100.png';

const giftCardImages = [GiftCard10, GiftCard25, GiftCard50, GiftCard100];

const StoreTabPrizes: React.FC = () => {
  const authState = useAuthState();
  const prizeState = usePrizeState();
  const gameState = useGameState();
  const purchaseGiftCardHandler = (amount: number) => {
    try {
      prizeState.actions.redeemPoints(amount);
    } catch (error) {
      console.log('error', error);
    }
  };

  React.useEffect(() => {
    console.log('prize', prizeState.state.giftCardList);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="store-item-container">
      {prizeState.state.giftCardList.map((i, index) => (
        <StoreItem
          key={i.amount}
          itemTitleName={`$${i.amount} Amazon Gift Card`}
          itemCostValue={`${i.pointCost} Points`}
          itemImage={giftCardImages[index]}
          onClick={() => purchaseGiftCardHandler(i.amount)}
          purchaseButtonText="Redeem Gift Card"
          itemIsValid={gameState.state.points >= i.pointCost}
          checkItemValidity
          isPoints
        />
      ))}
    </div>
  );
};

export default StoreTabPrizes;
