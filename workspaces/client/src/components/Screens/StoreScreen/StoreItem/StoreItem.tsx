import * as React from 'react';
import './StoreItem.scss';
// import ReactTooltip from 'react-tooltip';
import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import LoginModal from 'src/components/UIElements/LoginModal/LoginModal';

interface Props {
  key: string;
  priceId: string;
  coins: string;
  price: number;
  image: string;
  onClick: () => void;
  isPoints?: boolean;
}

const StoreItem: React.FC<Props> = ({ key, isPoints, image, priceId, coins, price, onClick }) => {
  const { state, actions } = useAuthState();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginModalActive, setLoginModalActive] = React.useState<boolean>(false);
  const clickHandler = () => {
    if (isLoading) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    onClick(priceId);
  };

  const openLoginModal = () => {
    setLoginModalActive(true);
  };

  const closeLoginModal = () => {
    setLoginModalActive(false);
  };

  return (
    <>
      <LoginModal closeDrawer={closeLoginModal} show={loginModalActive} />
      <article className="store-item">
        <div className="store-item__price">{isPoints ? `${price} Points` : `$${price}.00`}</div>
        <div className="store-item__credits">
          <div className="credits__icon">
            <img src={image} alt="" />
          </div>
          <div className="credits__title">
            <h3>+ {coins}</h3>
          </div>
          <FlatButton
            isLoading={isLoading}
            height={40}
            width={190}
            text="Purchase Credits"
            onClick={state.isAuthenticated ? clickHandler : openLoginModal}
          />
        </div>
      </article>
    </>
  );
};

export default StoreItem;
