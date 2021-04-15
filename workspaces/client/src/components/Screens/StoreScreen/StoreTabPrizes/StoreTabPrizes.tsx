import * as React from 'react';
import './StoreTabPrizes.scss';

import { useGameState, useAuthState, usePrizeState } from 'src/state/hooks';
import Modal from 'src/components/UIElements/Modal/Modal';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';
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
  const [errorModalActive, setErrorModalActive] = React.useState<boolean>(false);
  const [successModalActive, setSuccessModalActive] = React.useState<boolean>(false);
  const [confirmationModalActive, setConfirmationModalActive] = React.useState<boolean>(false);
  const [selectedCardValue, setSelectedCardValue] = React.useState<number>(0);
  const [selectedCardPointCost, setSelectedCardPointCost] = React.useState<number>(0);
  const [selectedCardImg, setSelectedCardImg] = React.useState<string>('');

  // const purchaseGiftCardHandler = (amount: number) => {
  //   try {
  //     // prizeState.actions.redeemPoints(amount);
  //     console.log('REDEEM POINTS DISPATCH');
  //     setSelectedCardValue(amount)
  //     setConfirmationModalActive(true);
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const reedeemItemHandler = (amount: number, pointCost: number, img: string) => {
    setSelectedCardImg(img);
    setSelectedCardValue(amount);
    setSelectedCardPointCost(pointCost);
    setConfirmationModalActive(true);
  };

  const clearDataHandler = () => {
    setSelectedCardValue(0);
    setSelectedCardPointCost(0);
    setSelectedCardImg('');
  };

  const redemptionConfirmationHandler = () => {
    try {
      prizeState.actions.redeemPoints(selectedCardValue);
      console.log('REDEEM POINTS DISPATCH');
      setConfirmationModalActive(false);
      setSuccessModalActive(true);
    } catch (error) {
      console.log('error', error);
      setErrorModalActive(true);
    }
  };

  const closeConfirmationModalHandler = () => {
    clearDataHandler();
    setConfirmationModalActive(false);
  };

  const closeSuccessModalHandler = () => {
    clearDataHandler();
    setSuccessModalActive(false);
  };
  const closeErrorModalHandler = () => {
    clearDataHandler();
    setErrorModalActive(false);
  };

  const redemptionConfirmationContent = (
    <div className="redemption-wrapper redemption--confirmation">
      <img src={selectedCardImg} alt="" />
      <h2>Please Confirm Redemption</h2>
      <p>
        Are you sure that you would like to use <span className="highlighted-item">{selectedCardPointCost} points</span> to redeem this item?
      </p>
      <div className="button-wrapper">
        <FlatButton height={40} width={195} text="Actually...Nevermind" onClick={closeConfirmationModalHandler} ghost />
        <FlatButton height={40} width={195} text={"Yes, I'm Sure!"} onClick={redemptionConfirmationHandler} />
      </div>
    </div>
  );

  const redemptionSuccessfullContent = (
    <div className="redemption-wrapper redemption--success">
      <div className="icon-wrapper">{congrats}</div>
      <h2>Redemption successful!</h2>
      <p>Congrats on redeeming your prize!</p>
      <div className="confirmation-email-container">
        <p>
          Your <span className="highlighted-item">${selectedCardValue} Amazon Gift Card</span> was sent to the following email:
        </p>
        <p className="confirmation-email">{authState.state.email}</p>
        <button onClick={closeSuccessModalHandler}>Back to store</button>
      </div>
    </div>
  );

  const redemptionErrorContent = (
    <div className="redemption-wrapper">
      <h2>Uh oh, something went wrong :(</h2>
      <p>Please contact support@fuku.tv so we can look into this issue for you</p>
    </div>
  );

  React.useEffect(() => {
    console.log('prize', prizeState.state.giftCardList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal className="store-modal" onCancel={closeErrorModalHandler} show={errorModalActive}>
        {redemptionErrorContent}
      </Modal>
      <Modal className="store-modal" onCancel={closeConfirmationModalHandler} show={confirmationModalActive}>
        {redemptionConfirmationContent}
      </Modal>
      <Modal className="store-modal" onCancel={closeSuccessModalHandler} show={successModalActive}>
        {redemptionSuccessfullContent}
      </Modal>
      <div className="store-item-container">
        {prizeState.state.giftCardList.map((i, index) => (
          <StoreItem
            key={i.amount}
            itemTitleName={`$${i.amount} Amazon Gift Card`}
            itemCostValue={`${i.pointCost} Points`}
            itemImage={giftCardImages[index]}
            onClick={() => reedeemItemHandler(i.amount, i.pointCost, giftCardImages[index])}
            purchaseButtonText={gameState.state.points >= i.pointCost ? 'Redeem Gift Card' : 'Not Enough Points'}
            itemIsValid={gameState.state.points >= i.pointCost}
            checkItemValidity
            isPoints
          />
        ))}
      </div>
    </>
  );
};

export default StoreTabPrizes;
const congrats = (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 480.187 480.187">
    <g>
      <g>
        <path d="M327.417,301.136c-1.498-4.157-6.082-6.312-10.238-4.814c-4.157,1.498-6.312,6.082-4.814,10.238    c0.037,0.102,0.076,0.203,0.117,0.304c7.296,19.04,7.824,33.6,1.44,40c-7.744,7.728-27.032,5.312-51.608-6.448    c-32.902-17.084-62.809-39.402-88.552-66.08c-62.664-62.672-88.52-124.168-72.528-140.16c5.103-4.03,11.736-5.578,18.096-4.224    c4.406,0.324,8.241-2.986,8.565-7.392c0.313-4.259-2.774-8.013-7.013-8.528c-11.123-1.968-22.535,1.275-30.96,8.8    c-29.312,29.304,15.496,105.744,72.528,162.784c27.021,27.962,58.419,51.333,92.96,69.192c6.255,2.995,12.701,5.574,19.296,7.72    l-56.84,21.552c-75.9-28.856-130.539-96.144-143.2-176.352c-0.685-4.365-4.779-7.349-9.144-6.664    c-4.365,0.685-7.349,4.779-6.664,9.144c1.256,8,2.936,16,4.992,23.824c18.422,69.799,66.943,127.784,132.4,158.224l-93.552,35.4    c-0.429-0.716-0.969-1.358-1.6-1.904c-23.776-19.089-38.694-47.084-41.28-77.464l-3.712-44.952    c-0.292-4.355-4.06-7.649-8.416-7.357c-0.083,0.006-0.166,0.012-0.248,0.021c-4.404,0.35-7.691,4.205-7.341,8.609    c0.001,0.018,0.003,0.037,0.005,0.055l3.776,44.936c2.812,32.473,17.96,62.633,42.328,84.28l-66.736,25.264l12-49.248    c1.047-4.295-1.585-8.625-5.88-9.672c-4.295-1.047-8.625,1.585-9.672,5.88l-15.608,64c-1.052,4.291,1.574,8.623,5.866,9.674    c1.574,0.386,3.227,0.284,4.742-0.29l296-112c0.471-0.23,0.916-0.509,1.328-0.832c6.406-0.984,12.345-3.946,16.984-8.472    C333.161,350.256,339.985,333.912,327.417,301.136z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M402.913,280.504c-43.247-16.19-89.99-20.729-135.544-13.16l-28.584,4.8c-4.339,0.834-7.18,5.027-6.346,9.366    c0.806,4.192,4.761,7.013,8.986,6.41l28.576-4.76c42.782-7.113,86.683-2.847,127.296,12.368c0.901,0.319,1.852,0.479,2.808,0.472    c4.418,0.007,8.006-3.568,8.013-7.987C408.124,284.668,406.048,281.673,402.913,280.504z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M431.353,156.56c-1.9-3.99-6.674-5.684-10.664-3.784l-168,80c-3.989,1.899-5.684,6.672-3.785,10.662    c0,0.001,0.001,0.002,0.001,0.002c1.899,3.989,6.672,5.684,10.662,3.785c0.001,0,0.001-0.001,0.002-0.001l168-80    C431.559,165.324,433.253,160.55,431.353,156.56z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M194.377,54.296c-0.88-4.33-5.103-7.127-9.433-6.247c-4.33,0.88-7.127,5.103-6.247,9.433    c0.019,0.096,0.041,0.191,0.064,0.286c10.126,45.239,5.953,92.507-11.944,135.272l-11.632,27.912    c-1.681,4.067,0.238,8.728,4.296,10.432c0.972,0.409,2.017,0.618,3.072,0.616c3.229,0,6.141-1.94,7.384-4.92l11.64-27.88    C200.752,153.391,205.225,102.757,194.377,54.296z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M440.105,288c-13.255,0-24,10.745-24,24s10.745,24,24,24s24-10.745,24-24S453.36,288,440.105,288z M440.105,320    c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S444.523,320,440.105,320z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M248.105,64c-13.255,0-24,10.745-24,24s10.745,24,24,24s24-10.745,24-24S261.36,64,248.105,64z M248.105,96    c-4.418,0-8-3.582-8-8s3.582-8,8-8s8,3.582,8,8S252.523,96,248.105,96z" />
      </g>
    </g>
    <g>
      <g>
        <circle cx="176.105" cy="16" r="16" />
      </g>
    </g>
    <g>
      <g>
        <path d="M400.105,40c-4.418,0-8,3.582-8,8v8c0,4.418,3.582,8,8,8s8-3.582,8-8v-8C408.105,43.582,404.523,40,400.105,40z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M400.105,0c-4.418,0-8,3.582-8,8v8c0,4.418,3.582,8,8,8s8-3.582,8-8V8C408.105,3.582,404.523,0,400.105,0z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M424.105,24h-8c-4.418,0-8,3.582-8,8s3.582,8,8,8h8c4.418,0,8-3.582,8-8S428.523,24,424.105,24z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M384.105,24h-8c-4.418,0-8,3.582-8,8s3.582,8,8,8h8c4.418,0,8-3.582,8-8S388.523,24,384.105,24z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M344.105,87.832h-40.168c-4.418,0-8,3.582-8,8V136c0,4.418,3.582,8,8,8h40.168c4.418,0,8-3.582,8-8V95.832    C352.105,91.414,348.523,87.832,344.105,87.832z M336.105,128h-24.168v-24.168h24.168V128z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M285.826,154.636c-2.937-3.135-7.825-3.391-11.073-0.58l-80,72c-3.282,2.956-3.547,8.013-0.592,11.296    c2.956,3.282,8.013,3.547,11.296,0.592l80-72C288.682,162.923,288.847,157.861,285.826,154.636z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M432.105,184c-4.418,0-8,3.582-8,8v8c0,4.418,3.582,8,8,8s8-3.582,8-8v-8C440.105,187.582,436.523,184,432.105,184z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M466.049,182.624l-5.656-5.656c-3.178-3.07-8.242-2.982-11.312,0.196c-2.994,3.1-2.994,8.015,0,11.116l5.656,5.656    c3.178,3.07,8.242,2.982,11.312-0.196C469.044,190.639,469.044,185.724,466.049,182.624z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M472.105,152h-8c-4.418,0-8,3.582-8,8s3.582,8,8,8h8c4.418,0,8-3.582,8-8S476.523,152,472.105,152z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M465.853,126.064c-3.1-2.994-8.015-2.994-11.116,0l-5.656,5.656c-3.124,3.125-3.123,8.19,0.002,11.314    c1.5,1.499,3.534,2.342,5.654,2.342v0c2.122,0,4.156-0.844,5.656-2.344l5.656-5.656    C469.119,134.198,469.031,129.133,465.853,126.064z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M432.105,112c-4.418,0-8,3.582-8,8v8c0,4.418,3.582,8,8,8s8-3.582,8-8v-8C440.105,115.582,436.523,112,432.105,112z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M415.129,131.72l-5.656-5.656c-3.178-3.069-8.242-2.982-11.312,0.196c-2.994,3.1-2.994,8.015,0,11.116l5.656,5.656    c3.178,3.07,8.242,2.982,11.312-0.196C418.124,139.735,418.124,134.82,415.129,131.72z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M95.713,34.592c-0.942-2.894-3.445-5.002-6.456-5.44l-23.48-3.416L55.305,4.464c-2.334-3.963-7.439-5.284-11.402-2.95    c-1.218,0.717-2.233,1.732-2.95,2.95l-10.52,21.272l-23.48,3.416c-4.373,0.631-7.406,4.688-6.775,9.061    c0.251,1.741,1.069,3.35,2.327,4.579l16.984,16.56l-4,23.384c-0.768,4.351,2.136,8.501,6.487,9.269    c1.752,0.309,3.556,0.026,5.129-0.805l21-11.072l21,11.04c3.911,2.056,8.748,0.553,10.804-3.358    c0.819-1.557,1.101-3.34,0.804-5.074l-4-23.384l16.992-16.56C95.88,40.663,96.658,37.485,95.713,34.592z M62.505,50.832    c-1.884,1.835-2.745,4.479-2.304,7.072l1.984,11.56L51.825,64c-2.329-1.223-5.111-1.223-7.44,0l-10.4,5.456l1.984-11.56    c0.449-2.583-0.397-5.223-2.264-7.064l-8.408-8.184l11.608-1.688c2.606-0.378,4.859-2.015,6.024-4.376l5.176-10.504l5.184,10.504    c1.164,2.359,3.413,3.995,6.016,4.376l11.6,1.688L62.505,50.832z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M453.081,401h-0.032l-3.296-4.944c-18.481-27.637-47.542-46.429-80.328-51.944c-4.374-0.624-8.426,2.416-9.05,6.79    c-0.603,4.226,2.218,8.181,6.41,8.986c23.648,4.014,45.199,16.028,61.048,34.032c-13.325,2.397-24.979,10.4-32,21.976    c-8.616,15.431-3.091,34.924,12.34,43.54c15.431,8.616,34.924,3.091,43.54-12.34c3.291-6.353,5.068-13.382,5.192-20.536    c8.512,12.363,9.193,28.508,1.752,41.544c-2.254,3.8-1.001,8.708,2.799,10.962c3.8,2.254,8.708,1.001,10.962-2.799    c0.072-0.122,0.141-0.245,0.207-0.371C487.273,449.732,478.645,416.671,453.081,401z M437.761,439.288    c-4.27,7.737-14.003,10.547-21.739,6.277s-10.547-14.003-6.277-21.739c0.024-0.043,0.048-0.087,0.072-0.13    c4.721-7.73,12.684-12.912,21.664-14.096c1.391-0.038,2.768,0.282,4,0.928C442.233,414.296,442.593,430.632,437.761,439.288z" />
      </g>
    </g>
  </svg>
);
