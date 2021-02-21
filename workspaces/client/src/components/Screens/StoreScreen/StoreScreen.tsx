import * as React from 'react';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import './StoreScreen.scss';
import Screen from 'src/components/UIElements/Screen/Screen';

import useCommerceState from 'src/state/hooks/useCommerceState';

const StoreScreen: React.FC = () => {
  const { state, actions } = useCommerceState();

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
  React.useEffect(() => {
    actions.getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Screen id="store" title="Store">
      <section id="store-section">
        <div className="store-table">
          {state.productList.map((i) => (
            <StoreItemRow key={i.name} coins={i.name} price={i.price} priceId={i.priceId} onClick={checkoutClickEvent} />
          ))}
        </div>
      </section>
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
