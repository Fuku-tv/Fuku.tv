import * as React from 'react';
import './StoreItem.scss';
// import ReactTooltip from 'react-tooltip';
import useAuthState from 'src/state/hooks/useAuthState';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
import LoginModal from 'src/components/UIElements/LoginModal/LoginModal';

interface Props {
  key: string;
  itemTitleName: string;
  itemCostValue: number;
  itemImage: string;
  purchaseButtonText: string;
  onClick: () => void;
  itemCostValueFormat?: string;
  priceId?: string;
  isPoints?: boolean;
  itemIsValid?: boolean;
  checkItemValidity?: boolean;
}

const StoreItem: React.FC<Props> = ({
  purchaseButtonText,
  isPoints,
  itemImage,
  priceId,
  itemTitleName,
  itemCostValue,
  itemIsValid,
  checkItemValidity,
  onClick,
}) => {
  const { state, actions } = useAuthState();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loginModalActive, setLoginModalActive] = React.useState<boolean>(false);
  const clickHandler = () => {
    if (isLoading) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    onClick();
  };

  const openLoginModal = () => {
    setLoginModalActive(true);
  };

  const closeLoginModal = () => {
    setLoginModalActive(false);
  };

  const disabledButton = <FlatButton isLoading={isLoading} height={40} width={195} text={purchaseButtonText} disabled />;

  const validButton = (
    <FlatButton
      isLoading={isLoading}
      height={40}
      width={195}
      text={purchaseButtonText}
      onClick={state.isAuthenticated ? clickHandler : openLoginModal}
    />
  );

  const checkButtonValidity = itemIsValid ? validButton : disabledButton;

  return (
    <>
      <LoginModal closeDrawer={closeLoginModal} show={loginModalActive} />
      <article className="store-item">
        <div className="store-item__cost-value">{itemCostValue}</div>
        <div className="store-item__body">
          <div className="item-image">
            <img src={itemImage} alt="" />
          </div>
          <div className="item-title">
            <h3>{itemTitleName}</h3>
          </div>
          {checkItemValidity ? checkButtonValidity : validButton}
        </div>
      </article>
    </>
  );
};

export default StoreItem;
