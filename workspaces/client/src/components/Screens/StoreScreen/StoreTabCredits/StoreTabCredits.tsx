import * as React from 'react';
// import './StoreTabCredits.scss';

import useCommerceState from 'src/state/hooks/useCommerceState';
import StoreItem from '../StoreItem/StoreItem';

const StoreTabCredits: React.FC = () => {
  const { state, actions } = useCommerceState();

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

  React.useEffect(() => {
    actions.getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="store-item-container">
      {state.productList &&
        state.productList
          .slice(0)
          .reverse()
          .map((i) => (
            <StoreItem
              key={i.name}
              itemTitleName={`+ ${i.name}`}
              itemCostValue={`$${i.price}.00`}
              priceId={i.priceId}
              itemImage={i.imgUrl}
              onClick={() => checkoutClickEvent(i.priceId)}
              purchaseButtonText={`Purchase ${i.name}`}
            />
          ))}
    </div>
  );
};

export default StoreTabCredits;
