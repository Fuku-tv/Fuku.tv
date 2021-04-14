import * as React from 'react';
// import './StoreTabPrizes.scss';
import Screen from 'src/components/UIElements/Screen/Screen';
import useCommerceState from 'src/state/hooks/useCommerceState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import { createGiftCard } from 'src/services/giftCardService';
import LoadingSpinner from 'src/components/UIElements/LoadingSpinner/LoadingSpinner';
import { useAuthState } from 'src/state/hooks';
import StoreItem from '../StoreItem/StoreItem';
import GiftCard10 from './images/amazon-10.png';
import GiftCard25 from './images/amazon-25.png';
import GiftCard50 from './images/amazon-50.png';
import GiftCard100 from './images/amazon-100.png';

const giftCardItems = [
  {
    name: '$10 Amazon Gift Card',
    price: '1000',
    priceId: '10',
    image: GiftCard10,
    onClickValue: 10,
  },
  {
    name: '$25 Amazon Gift Card',
    price: '2500',
    priceId: '25',
    image: GiftCard25,
    onClickValue: 25,
  },
  {
    name: '$50 Amazon Gift Card',
    price: '5000',
    priceId: '50',
    image: GiftCard50,
    onClickValue: 50,
  },
  {
    name: '$100 Amazon Gift Card',
    price: '10000',
    priceId: '100',
    image: GiftCard100,
    onClickValue: 100,
  },
];

const StoreTabPrizes: React.FC = () => {
  const { state, actions } = useCommerceState();
  const authState = useAuthState();
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

  const giftcardRedeemEvent = async (amount: number) => {
    await createGiftCard(amount, authState.state.accessToken);
  };

  React.useEffect(() => {
    // actions.getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="store-item-container">
      {giftCardItems.map((i) => (
        <StoreItem
          key={i.name}
          coins={i.name}
          price={i.price}
          priceId={i.priceId}
          image={i.image}
          onClick={() => giftcardRedeemEvent(i.onClickValue)}
          isPoints
        />
      ))}
    </div>
  );
};

export default StoreTabPrizes;
