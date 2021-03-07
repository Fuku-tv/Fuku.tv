import * as React from 'react';
import './StoreItem.scss';
// import ReactTooltip from 'react-tooltip';
import FlatButton from 'src/components/UIElements/FlatButton/FlatButton';

interface Props {
  key: string;
  priceId: string;
  coins: string;
  price: number;
  image: string;

  onClick: () => void;
}

const StoreItem: React.FC<Props> = ({ key, image, priceId, coins, price, onClick }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const clickHandler = () => {
    setIsLoading(true);
    onClick(priceId);
  };
  return (
    <article className="store-item">
      <div className="store-item__price">${price}.00</div>
      <div className="store-item__credits">
        <div className="credits__icon">
          <img src={image} alt="" />
        </div>
        <div className="credits__title">
          <h3>+ {coins}</h3>
        </div>
        <FlatButton isLoading={isLoading} height={40} width={190} text="Purchase Credits" onClick={clickHandler} />
      </div>
    </article>
  );
};

export default StoreItem;

const fukuCredit = (
  <svg id="credit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 325.61 331.87">
    <g id="credit-white">
      <g id="coin">
        <path d="M332.73,365.39q-5.28,4.77-10.94,9h18a135.44,135.44,0,0,0,13-9Z" transform="translate(-95.76 -69.58)" style={{ fill: '#fff' }} />
        <path
          d="M302.6,84.6h11.46a121.8,121.8,0,0,0-23-5.36Q296.94,81.64,302.6,84.6Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M362.5,329.06c-2.08,3.46-4.29,6.83-6.6,10.1h22.69q3.74-4.87,7.12-10.1Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M308.77,383h0a134.57,134.57,0,0,1-17.69,8.75A122.32,122.32,0,0,0,323,383H308.77Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M376.15,170.07a179.64,179.64,0,0,1,6.2,19.69H406.8a170.13,170.13,0,0,0-6.54-19.69H376.15Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M388,235.51q0,8.15-.69,16.09H412q.71-7.93.71-16.09,0-4-.17-7.86H387.84Q388,231.57,388,235.51Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M338.19,110.83q4.83,4.82,9.26,10.09h21.88A140.68,140.68,0,0,0,359,110.83H338.19Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path d="M396.58,309.44h-23.9q-2.48,5.63-5.31,11h23.56q3-5.35,5.65-11Z" transform="translate(-95.76 -69.58)" style={{ fill: '#fff' }} />
        <path d="M380.34,288.55q-1.86,6.26-4.14,12.26h24.12q2.4-6,4.36-12.26Z" transform="translate(-95.76 -69.58)" style={{ fill: '#fff' }} />
        <path
          d="M408.86,198.39H384.31a185.26,185.26,0,0,1,3,20.63H412A175.83,175.83,0,0,0,408.86,198.39Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M386.38,260.23h0a183.44,183.44,0,0,1-3.69,19.69h24.46A174.88,174.88,0,0,0,411,260.23H386.38Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path d="M349.37,347.79q-3.76,4.66-7.84,9h21.21q4.51-4.27,8.71-9Z" transform="translate(-95.76 -69.58)" style={{ fill: '#fff' }} />
        <path
          d="M376.58,129.32v.24H354.24q3.9,5.31,7.4,11h23.14q-3.87-5.84-8.2-11.23Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M390.13,149.18H366.62q3.21,6,6,12.25H396.5Q393.56,155.13,390.13,149.18Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M333.84,93.23H317a146.94,146.94,0,0,1,11.79,9h19.36A130.5,130.5,0,0,0,333.84,93.23Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M362.42,102.42h0v-.23h-.28c-24.3-20.48-54.38-32.61-86.9-32.61a129.57,129.57,0,0,0-16.68,1.07,129.57,129.57,0,0,0-16.68-1.07C161.31,69.58,95.76,144,95.76,235.51s65.55,165.94,146.12,165.94a129.57,129.57,0,0,0,16.68-1.07,129.57,129.57,0,0,0,16.68,1.07c80.58,0,146.13-74.44,146.13-165.94C421.37,181.09,398.18,132.7,362.42,102.42ZM291.07,391.77A134.57,134.57,0,0,0,308.76,383H323A122.32,122.32,0,0,1,291.07,391.77Zm-65,0c-68.39-9-121.66-75.65-121.66-156.26s53.3-147.28,121.7-156.27a121.26,121.26,0,0,1,15.79-1h.69a119.17,119.17,0,0,1,16,1.16c68,9.44,120.81,75.87,120.81,156.14s-52.84,146.7-120.81,156.14a119.5,119.5,0,0,1-16,1.16h-.66A120.14,120.14,0,0,1,226.05,391.77ZM359,110.83a140.68,140.68,0,0,1,10.36,10.09H347.45q-4.43-5.28-9.26-10.09H359Zm53.76,124.68q0,8.15-.71,16.09H387.31q.69-7.93.69-16.09,0-3.94-.16-7.86h24.72Q412.73,231.55,412.73,235.51ZM378.59,339.16H355.9c2.31-3.27,4.52-6.64,6.6-10.1h23.21Q382.34,334.28,378.59,339.16Zm-38.81,35.22h-18q5.65-4.22,10.94-9h20A135.44,135.44,0,0,1,339.78,374.38ZM302.6,84.6q-5.67-3-11.57-5.36a121.8,121.8,0,0,1,23,5.36Zm97.66,85.47a170.13,170.13,0,0,1,6.54,19.69H382.35a179.64,179.64,0,0,0-6.2-19.69h24.11Zm-13,49a185.26,185.26,0,0,0-3-20.63h24.55A175.83,175.83,0,0,1,412,219Zm-14.67-57.59h0q-2.78-6.28-6-12.25h23.51q3.42,5.94,6.37,12.25H372.61Zm-11-20.88q-3.5-5.67-7.4-11h22.34v-.24h0q4.34,5.38,8.2,11.23Zm-32.86-38.36h0a146.94,146.94,0,0,0-11.79-9h16.85a130.5,130.5,0,0,1,14.3,9H328.78Zm34,254.57H341.53q4.08-4.31,7.84-9h22.08Q367.27,352.49,362.74,356.76Zm28.19-36.33H367.37q2.83-5.37,5.31-11h23.9Q393.94,315.08,390.93,320.43Zm9.39-19.62H376.2q2.28-6,4.14-12.26h24.34Q402.73,294.81,400.32,300.81Zm6.83-20.89H382.69a183.44,183.44,0,0,0,3.69-19.69H411A174.88,174.88,0,0,1,407.15,279.92Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M258.56,391.65c68-9.44,120.81-75.86,120.81-156.14S326.53,88.81,258.56,79.37a119.17,119.17,0,0,0-16-1.16h-.69a121.26,121.26,0,0,0-15.79,1c-68.4,9-121.7,75.65-121.7,156.27s53.27,147.25,121.66,156.26a120.14,120.14,0,0,0,15.83,1h.66A119.5,119.5,0,0,0,258.56,391.65Zm100.82-86.32c-.41.89-.83,1.78-1.26,2.66a4.32,4.32,0,1,1-7.77-3.76q.61-1.26,1.2-2.52a4.31,4.31,0,1,1,7.83,3.62Zm7.43-19.23c-.3.93-.6,1.87-.91,2.8a4.32,4.32,0,1,1-8.19-2.73c.29-.89.58-1.77.86-2.66a4.32,4.32,0,1,1,8.24,2.59Zm4.93-20c-.18,1-.36,1.93-.55,2.89a4.33,4.33,0,0,1-4.23,3.47,4.89,4.89,0,0,1-.85-.08,4.32,4.32,0,0,1-3.39-5.08c.18-.91.36-1.83.52-2.75a4.32,4.32,0,0,1,8.5,1.55ZM374,248.59a4.32,4.32,0,0,1-4.3,4l-.33,0a4.32,4.32,0,0,1-4-4.63c.07-.92.14-1.85.19-2.79a4.32,4.32,0,0,1,8.62.51C374.12,246.64,374.06,247.62,374,248.59Zm.18-23.5c.06,1,.11,1.95.16,2.93a4.32,4.32,0,0,1-4.13,4.5H370a4.31,4.31,0,0,1-4.31-4.13c0-.94-.09-1.87-.14-2.79a4.31,4.31,0,1,1,8.61-.52Zm-2.47-20.44c.17,1,.34,1.93.5,2.9a4.32,4.32,0,0,1-8.52,1.41c-.15-.92-.31-1.84-.47-2.75a4.32,4.32,0,0,1,8.49-1.56Zm-5-20c.3.94.58,1.87.86,2.82a4.31,4.31,0,0,1-2.91,5.36,4.36,4.36,0,0,1-1.23.18,4.3,4.3,0,0,1-4.13-3.09c-.27-.89-.54-1.78-.82-2.67a4.32,4.32,0,0,1,8.23-2.6Zm-13.19-21.32a4.33,4.33,0,0,1,5.74,2.1c.41.89.82,1.79,1.21,2.69a4.32,4.32,0,1,1-7.9,3.48c-.37-.85-.75-1.69-1.14-2.53A4.32,4.32,0,0,1,353.53,163.34ZM343.41,146a4.32,4.32,0,0,1,6,1.32l1.56,2.5a4.32,4.32,0,0,1-7.37,4.51c-.48-.8-1-1.59-1.48-2.37A4.32,4.32,0,0,1,343.41,146Zm-2.7,175.14c.51-.78,1-1.56,1.52-2.34a4.32,4.32,0,0,1,7.29,4.63c-.53.83-1.07,1.66-1.61,2.47a4.32,4.32,0,1,1-7.2-4.76ZM331,130.25a4.31,4.31,0,0,1,6.08.48c.64.75,1.27,1.5,1.9,2.26a4.32,4.32,0,0,1-6.68,5.48c-.58-.72-1.18-1.43-1.78-2.13A4.31,4.31,0,0,1,331,130.25Zm-2.13,206.34c.61-.7,1.22-1.39,1.82-2.1a4.31,4.31,0,1,1,6.57,5.59c-.64.75-1.28,1.5-1.94,2.24a4.31,4.31,0,0,1-6.45-5.73ZM316.44,116.44a4.31,4.31,0,0,1,6.09-.42c.75.65,1.48,1.3,2.21,2a4.31,4.31,0,1,1-5.8,6.39c-.69-.63-1.38-1.24-2.08-1.85A4.32,4.32,0,0,1,316.44,116.44Zm-1.51,233.7c.71-.59,1.42-1.2,2.12-1.81a4.32,4.32,0,0,1,5.68,6.5c-.74.65-1.5,1.3-2.26,1.93a4.26,4.26,0,0,1-2.76,1,4.32,4.32,0,0,1-2.78-7.63ZM300,105a4.32,4.32,0,0,1,5.95-1.37c.84.52,1.67,1.06,2.49,1.6a4.32,4.32,0,0,1-4.75,7.21c-.77-.51-1.54-1-2.32-1.49A4.32,4.32,0,0,1,300,105Zm-.81,256.35,2.37-1.45a4.31,4.31,0,1,1,4.59,7.3c-.83.53-1.68,1-2.53,1.56a4.32,4.32,0,0,1-4.43-7.41ZM281.83,96.45a4.32,4.32,0,0,1,5.64-2.33c.92.38,1.83.77,2.73,1.18a4.32,4.32,0,0,1-3.5,7.89c-.85-.38-1.69-.74-2.54-1.09A4.32,4.32,0,0,1,281.83,96.45Zm0,273.43c.86-.33,1.71-.68,2.56-1a4.31,4.31,0,1,1,3.33,8c-.91.38-1.83.75-2.75,1.11a4.37,4.37,0,0,1-1.57.3,4.32,4.32,0,0,1-1.57-8.34ZM262.49,91.1a4.32,4.32,0,0,1,5.16-3.27c1,.22,1.94.45,2.9.69a4.31,4.31,0,1,1-2.1,8.37c-.89-.22-1.79-.43-2.69-.63A4.33,4.33,0,0,1,262.49,91.1Zm.79,284.19,2.7-.57a4.32,4.32,0,0,1,1.9,8.42c-1,.22-1.94.42-2.91.62a5,5,0,0,1-.85.08,4.32,4.32,0,0,1-.84-8.55ZM129.07,156.35c.47-.86,1-1.72,1.44-2.57a4.32,4.32,0,1,1,7.5,4.27c-.46.81-.92,1.62-1.36,2.44a4.32,4.32,0,0,1-7.58-4.14Zm-8.67,18.72c.36-.92.72-1.84,1.09-2.75a4.32,4.32,0,1,1,8,3.27c-.35.86-.69,1.72-1,2.59a4.31,4.31,0,0,1-4,2.76,4.27,4.27,0,0,1-1.56-.29A4.32,4.32,0,0,1,120.4,175.07Zm-6.19,19.65c.23-1,.48-1.91.73-2.86a4.32,4.32,0,1,1,8.34,2.23q-.36,1.35-.69,2.7a4.32,4.32,0,0,1-4.19,3.28,4.17,4.17,0,0,1-1-.13A4.31,4.31,0,0,1,114.21,194.72ZM110.5,215c.12-1,.25-1.95.38-2.92a4.32,4.32,0,0,1,8.55,1.18c-.12.92-.24,1.85-.35,2.77a4.33,4.33,0,0,1-4.28,3.81,4.73,4.73,0,0,1-.53,0A4.32,4.32,0,0,1,110.5,215Zm-1.22,20.54q0-1.47,0-2.94a4.31,4.31,0,0,1,4.31-4.24h.07a4.32,4.32,0,0,1,4.25,4.39q0,1.4,0,2.79v.28a4.32,4.32,0,0,1-8.63,0Zm1.26,20.82c-.12-1-.23-1.94-.33-2.92a4.31,4.31,0,0,1,8.58-.9c.1.93.21,1.85.32,2.78a4.31,4.31,0,0,1-3.77,4.8,3,3,0,0,1-.52,0A4.32,4.32,0,0,1,110.54,256.33Zm3.73,20.25c-.23-.95-.46-1.9-.68-2.86a4.32,4.32,0,1,1,8.41-1.94c.21.91.43,1.81.65,2.71a4.32,4.32,0,0,1-3.14,5.24,4.77,4.77,0,0,1-1.05.12A4.32,4.32,0,0,1,114.27,276.58ZM124.53,299a4.33,4.33,0,0,1-4-2.76c-.35-.91-.7-1.83-1-2.75a4.32,4.32,0,1,1,8.1-3c.33.88.65,1.75,1,2.61a4.33,4.33,0,0,1-4,5.89Zm10.54,17.65a4.32,4.32,0,0,1-5.86-1.71c-.48-.86-.94-1.73-1.4-2.6a4.32,4.32,0,1,1,7.65-4c.43.82.87,1.64,1.32,2.45A4.32,4.32,0,0,1,135.07,316.63Zm11.29,16.59a4.33,4.33,0,0,1-6-.91c-.58-.79-1.16-1.58-1.73-2.39a4.31,4.31,0,0,1,7-5l1.63,2.25A4.31,4.31,0,0,1,146.36,333.22Zm2.42-191.38c-.57.73-1.12,1.47-1.67,2.22a4.32,4.32,0,0,1-7-5.12c.58-.8,1.17-1.58,1.77-2.36a4.32,4.32,0,0,1,6.85,5.26ZM247,85.1c1,.05,2,.1,3,.17a4.32,4.32,0,0,1-.3,8.62h-.3c-.91-.06-1.83-.11-2.75-.15A4.32,4.32,0,0,1,247,85.1Zm-2.89,292.28c.92,0,1.84-.05,2.75-.09a4.31,4.31,0,1,1,.39,8.62c-1,0-2,.08-3,.1h-.09a4.32,4.32,0,0,1-.09-8.63ZM226.24,86c1-.13,2-.25,2.95-.36a4.35,4.35,0,0,1,2.65.57,4.32,4.32,0,0,1-1.72,8c-.92.09-1.83.2-2.74.33a5.63,5.63,0,0,1-.58,0,4.31,4.31,0,0,1-4.27-3.74,4.44,4.44,0,0,1,0-.63A4.31,4.31,0,0,1,226.24,86Zm-1.36,290q1.37.21,2.73.39a4.32,4.32,0,0,1-.55,8.6,5.46,5.46,0,0,1-.57,0c-1-.13-2-.27-3-.43a4.31,4.31,0,0,1-3.59-4.93.61.61,0,0,1,0-.13A4.3,4.3,0,0,1,224.88,376.08ZM206,90.58c.94-.3,1.89-.59,2.84-.86a4.32,4.32,0,0,1,5.35,2.93,4.11,4.11,0,0,1,.11,1.9h0A4.28,4.28,0,0,1,211.2,98c-.88.26-1.75.53-2.63.81a4.21,4.21,0,0,1-1.31.2H207a4.31,4.31,0,0,1-3.74-2.75l-.09-.25A4.31,4.31,0,0,1,206,90.58Zm-19.18,8c.88-.46,1.77-.9,2.66-1.34a4.32,4.32,0,0,1,4.54.46,4.37,4.37,0,0,1,1.23,1.52,4.33,4.33,0,0,1-2,5.78c-.83.4-1.65.82-2.47,1.24a3.79,3.79,0,0,1-1.05.38,3.69,3.69,0,0,1-.93.11,4.34,4.34,0,0,1-3.54-1.83,5.09,5.09,0,0,1-.3-.5A4.32,4.32,0,0,1,186.77,98.56ZM159.88,348.05a4.32,4.32,0,0,1-6.11,0c-.69-.7-1.37-1.41-2.05-2.13A4.31,4.31,0,1,1,158,340c.64.67,1.29,1.34,1.94,2A4.32,4.32,0,0,1,159.88,348.05Zm1.81-220.74c-.66.65-1.32,1.3-2,2a4.31,4.31,0,0,1-6.14-6.06c.69-.7,1.39-1.4,2.1-2.09a4.31,4.31,0,0,1,6,6.19Zm13.75,233.38a4.3,4.3,0,0,1-3.47,1.75,4.35,4.35,0,0,1-2.57-.85c-.79-.59-1.57-1.18-2.35-1.79a4.31,4.31,0,0,1,4.81-7.14,5.25,5.25,0,0,1,.49.33c.73.56,1.46,1.12,2.2,1.66a4.33,4.33,0,0,1,.89,6Zm3-249.33a4.31,4.31,0,0,1-1.81,3.52c-.76.54-1.51,1.08-2.25,1.64a4.23,4.23,0,0,1-1.47.7,4.11,4.11,0,0,1-1.1.15,4.32,4.32,0,0,1-2.59-7.78l2.4-1.75a4.32,4.32,0,0,1,6,1,4.26,4.26,0,0,1,.8,2.49ZM189,373.05a4.28,4.28,0,0,1-2-.48c-.88-.45-1.75-.92-2.62-1.39a4.31,4.31,0,0,1-1.71-5.86,4,4,0,0,1,.67-.91,4.31,4.31,0,0,1,5.19-.8l.67.36c.58.32,1.17.63,1.76.93a4.23,4.23,0,0,1,2,2.25,4.3,4.3,0,0,1-.17,3.57,4.11,4.11,0,0,1-.82,1.09A4.3,4.3,0,0,1,189,373.05Zm18.52,7.67a4.51,4.51,0,0,1-1.3-.2c-1-.3-1.89-.61-2.83-.94a4.32,4.32,0,0,1-2.68-5.48,3.72,3.72,0,0,1,.39-.83,4.31,4.31,0,0,1,5-1.89l.13,0c.87.3,1.75.59,2.62.86a4.32,4.32,0,0,1-1.3,8.44Z"
          transform="translate(-95.76 -69.58)"
          style={{ fill: '#fff' }}
        />
        <path
          d="M113.6,240.1a4.31,4.31,0,0,0,4.31-4.31v-.28q0-1.39,0-2.79a4.32,4.32,0,0,0-4.25-4.39h-.07a4.31,4.31,0,0,0-4.31,4.24q0,1.47,0,2.94v.28A4.31,4.31,0,0,0,113.6,240.1Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M155.68,121.12c-.71.69-1.41,1.39-2.1,2.09a4.31,4.31,0,1,0,6.14,6.06c.65-.66,1.31-1.31,2-2a4.31,4.31,0,0,0-6-6.19Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M158,340a4.31,4.31,0,1,0-6.25,5.94c.68.72,1.36,1.43,2.05,2.13a4.32,4.32,0,1,0,6.14-6.08C159.26,341.29,158.61,340.62,158,340Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M117.36,199.94a4.17,4.17,0,0,0,1,.13,4.32,4.32,0,0,0,4.19-3.28q.33-1.35.69-2.7a4.32,4.32,0,1,0-8.34-2.23c-.25.95-.5,1.9-.73,2.86A4.31,4.31,0,0,0,117.36,199.94Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M130.79,162.21a4.31,4.31,0,0,0,5.86-1.72c.44-.82.9-1.63,1.36-2.44a4.32,4.32,0,1,0-7.5-4.27c-.49.85-1,1.71-1.44,2.57A4.32,4.32,0,0,0,130.79,162.21Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M115.34,260.09a4.31,4.31,0,0,0,3.77-4.8c-.11-.93-.22-1.85-.32-2.78a4.31,4.31,0,0,0-8.58.9c.1,1,.21,2,.33,2.92a4.32,4.32,0,0,0,4.28,3.8A3,3,0,0,0,115.34,260.09Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M171.59,107.84l-2.4,1.75a4.32,4.32,0,0,0,2.59,7.78,4.11,4.11,0,0,0,1.1-.15,4.23,4.23,0,0,0,1.47-.7c.74-.56,1.49-1.1,2.25-1.64a4.31,4.31,0,0,0,1.81-3.52h0a4.26,4.26,0,0,0-.8-2.49A4.32,4.32,0,0,0,171.59,107.84Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M122.87,180.65a4.27,4.27,0,0,0,1.56.29,4.31,4.31,0,0,0,4-2.76c.34-.87.68-1.73,1-2.59a4.32,4.32,0,1,0-8-3.27c-.37.91-.73,1.83-1.09,2.75A4.32,4.32,0,0,0,122.87,180.65Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M185.23,104.88a4.34,4.34,0,0,0,3.54,1.83,3.69,3.69,0,0,0,.93-.11,3.79,3.79,0,0,0,1.05-.38c.82-.42,1.64-.84,2.47-1.24a4.33,4.33,0,0,0,2-5.78A4.37,4.37,0,0,0,194,97.68a4.32,4.32,0,0,0-4.54-.46c-.89.44-1.78.88-2.66,1.34a4.32,4.32,0,0,0-1.84,5.82A5.09,5.09,0,0,0,185.23,104.88Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M122.65,274.49c-.22-.9-.44-1.8-.65-2.71a4.32,4.32,0,1,0-8.41,1.94c.22,1,.45,1.91.68,2.86a4.32,4.32,0,0,0,4.19,3.27,4.77,4.77,0,0,0,1.05-.12A4.32,4.32,0,0,0,122.65,274.49Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M148,135.79a4.31,4.31,0,0,0-6.06.79c-.6.78-1.19,1.56-1.77,2.36a4.32,4.32,0,1,0,7,5.12c.55-.75,1.1-1.49,1.67-2.22A4.32,4.32,0,0,0,148,135.79Z"
          transform="translate(-95.76 -69.58)"
        />
        <path d="M145.63,324.93a4.31,4.31,0,0,0-7,5c.57.81,1.15,1.6,1.73,2.39a4.32,4.32,0,1,0,6.94-5.13Z" transform="translate(-95.76 -69.58)" />
        <path
          d="M128.55,293.09c-.34-.86-.66-1.73-1-2.61a4.32,4.32,0,1,0-8.1,3c.34.92.69,1.84,1,2.75a4.33,4.33,0,0,0,4,2.76,4.33,4.33,0,0,0,4-5.89Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M135.46,308.32a4.32,4.32,0,1,0-7.65,4c.46.87.92,1.74,1.4,2.6a4.32,4.32,0,0,0,7.57-4.15C136.33,310,135.89,309.14,135.46,308.32Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M114.27,219.77a4.73,4.73,0,0,0,.53,0,4.33,4.33,0,0,0,4.28-3.81c.11-.92.23-1.85.35-2.77a4.32,4.32,0,0,0-8.55-1.18c-.13,1-.26,1.95-.38,2.92A4.32,4.32,0,0,0,114.27,219.77Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M265.76,96.26c.9.2,1.8.41,2.69.63a4.31,4.31,0,1,0,2.1-8.37c-1-.24-1.93-.47-2.9-.69a4.32,4.32,0,0,0-1.89,8.43Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M358.49,187.26c.28.89.55,1.78.82,2.67a4.3,4.3,0,0,0,4.13,3.09,4.36,4.36,0,0,0,1.23-.18,4.31,4.31,0,0,0,2.91-5.36c-.28-.95-.56-1.88-.86-2.82a4.32,4.32,0,0,0-8.23,2.6Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M343.56,154.35a4.32,4.32,0,0,0,7.37-4.51l-1.56-2.5a4.32,4.32,0,0,0-7.29,4.64C342.58,152.76,343.08,153.55,343.56,154.35Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M341.93,327.14a4.3,4.3,0,0,0,6-1.22c.54-.81,1.08-1.64,1.61-2.47a4.32,4.32,0,0,0-7.29-4.63c-.5.78-1,1.56-1.52,2.34A4.32,4.32,0,0,0,341.93,327.14Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M246.64,93.73c.92,0,1.84.09,2.75.15h.3a4.32,4.32,0,0,0,.3-8.62c-1-.07-2-.12-3-.17a4.32,4.32,0,0,0-.37,8.63Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M332.3,138.47a4.33,4.33,0,0,0,3.34,1.58A4.32,4.32,0,0,0,339,133c-.63-.76-1.26-1.51-1.9-2.26a4.32,4.32,0,1,0-6.56,5.61C331.12,137,331.72,137.75,332.3,138.47Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M370.12,241.1a4.31,4.31,0,0,0-4.56,4.05c-.05.94-.12,1.87-.19,2.79a4.32,4.32,0,0,0,4,4.63l.33,0a4.32,4.32,0,0,0,4.3-4c.08-1,.14-2,.2-2.93A4.32,4.32,0,0,0,370.12,241.1Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M244.21,386h.09c1,0,2-.06,3-.1a4.31,4.31,0,1,0-.39-8.62c-.91,0-1.83.07-2.75.09a4.32,4.32,0,0,0,.09,8.63Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M332.09,343.77a4.29,4.29,0,0,0,3.23-1.45c.66-.74,1.3-1.49,1.94-2.24a4.31,4.31,0,1,0-6.57-5.59c-.6.71-1.21,1.4-1.82,2.1a4.32,4.32,0,0,0,3.22,7.18Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M365.55,225.61c.05.92.1,1.85.14,2.79a4.31,4.31,0,0,0,4.31,4.13h.19a4.32,4.32,0,0,0,4.13-4.5c-.05-1-.1-2-.16-2.93a4.31,4.31,0,1,0-8.61.52Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M226.8,94.62a5.63,5.63,0,0,0,.58,0c.91-.13,1.82-.24,2.74-.33a4.32,4.32,0,0,0-.93-8.59c-1,.11-2,.23-2.95.36a4.31,4.31,0,0,0-3.75,4.22,4.44,4.44,0,0,0,0,.63A4.31,4.31,0,0,0,226.8,94.62Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M366.66,201.19a4.31,4.31,0,0,0-3.46,5c.16.91.32,1.83.47,2.75a4.32,4.32,0,1,0,8.52-1.41c-.16-1-.33-1.93-.5-2.9A4.32,4.32,0,0,0,366.66,201.19Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M351.44,169.08c.39.84.77,1.68,1.14,2.53a4.32,4.32,0,1,0,7.9-3.48c-.39-.9-.8-1.8-1.21-2.69a4.32,4.32,0,1,0-7.83,3.64Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M284.16,102.1c.85.35,1.69.71,2.54,1.09a4.32,4.32,0,0,0,3.5-7.89c-.9-.41-1.81-.8-2.73-1.18a4.32,4.32,0,0,0-3.31,8Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M357.27,299.6a4.3,4.3,0,0,0-5.72,2.11q-.58,1.26-1.2,2.52a4.32,4.32,0,1,0,7.77,3.76c.43-.88.85-1.77,1.26-2.66A4.31,4.31,0,0,0,357.27,299.6Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M301.36,369.4a4.31,4.31,0,0,0,2.21-.61c.85-.51,1.7-1,2.53-1.56a4.31,4.31,0,1,0-4.59-7.3l-2.37,1.45a4.32,4.32,0,0,0,2.22,8Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M264.12,383.84a5,5,0,0,0,.85-.08c1-.2,1.94-.4,2.91-.62a4.32,4.32,0,0,0-1.9-8.42l-2.7.57a4.32,4.32,0,0,0,.84,8.55Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M364,280.68a4.32,4.32,0,0,0-5.41,2.83c-.28.89-.57,1.77-.86,2.66a4.32,4.32,0,0,0,8.19,2.73c.31-.93.61-1.87.91-2.8A4.34,4.34,0,0,0,364,280.68Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M283.36,378.22a4.37,4.37,0,0,0,1.57-.3c.92-.36,1.84-.73,2.75-1.11a4.31,4.31,0,1,0-3.33-8c-.85.35-1.7.7-2.56,1a4.32,4.32,0,0,0,1.57,8.34Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M318.94,124.38a4.31,4.31,0,0,0,5.8-6.39c-.73-.67-1.46-1.32-2.21-2a4.32,4.32,0,1,0-5.67,6.51C317.56,123.14,318.25,123.75,318.94,124.38Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M317.71,357.77a4.26,4.26,0,0,0,2.76-1c.76-.63,1.52-1.28,2.26-1.93a4.32,4.32,0,0,0-5.68-6.5c-.7.61-1.41,1.22-2.12,1.81a4.32,4.32,0,0,0,2.78,7.63Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M368.26,261.08a4.33,4.33,0,0,0-5,3.47c-.16.92-.34,1.84-.52,2.75a4.32,4.32,0,0,0,3.39,5.08,4.89,4.89,0,0,0,.85.08,4.33,4.33,0,0,0,4.23-3.47c.19-1,.37-1.93.55-2.89A4.32,4.32,0,0,0,368.26,261.08Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M301.32,111c.78.49,1.55,1,2.32,1.49a4.32,4.32,0,1,0,4.75-7.21c-.82-.54-1.65-1.08-2.49-1.6a4.32,4.32,0,1,0-4.58,7.32Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M193,367.15a4.23,4.23,0,0,0-2-2.25c-.59-.3-1.18-.61-1.76-.93l-.67-.36a4.31,4.31,0,0,0-5.19.8,4,4,0,0,0-.67.91,4.31,4.31,0,0,0,1.71,5.86c.87.47,1.74.94,2.62,1.39a4.31,4.31,0,0,0,5-.76,4.11,4.11,0,0,0,.82-1.09A4.3,4.3,0,0,0,193,367.15Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M174.55,354.65c-.74-.54-1.47-1.1-2.2-1.66a5.25,5.25,0,0,0-.49-.33,4.31,4.31,0,0,0-4.81,7.14c.78.61,1.56,1.2,2.35,1.79a4.35,4.35,0,0,0,2.57.85,4.33,4.33,0,0,0,2.58-7.79Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M203.24,96.25A4.31,4.31,0,0,0,207,99h.28a4.21,4.21,0,0,0,1.31-.2c.88-.28,1.75-.55,2.63-.81a4.28,4.28,0,0,0,3.05-3.44h0a4.11,4.11,0,0,0-.11-1.9,4.32,4.32,0,0,0-5.35-2.93c-.95.27-1.9.56-2.84.86a4.31,4.31,0,0,0-2.8,5.42Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M223.54,384.6c1,.16,2,.3,3,.43a5.46,5.46,0,0,0,.57,0,4.34,4.34,0,0,0,2.82-1.06,4.32,4.32,0,0,0-2.27-7.54q-1.37-.18-2.73-.39a4.3,4.3,0,0,0-4.9,3.46.61.61,0,0,0,0,.13A4.31,4.31,0,0,0,223.54,384.6Z"
          transform="translate(-95.76 -69.58)"
        />
        <path
          d="M211.52,374.87a4.29,4.29,0,0,0-2.74-2.59c-.87-.27-1.75-.56-2.62-.86l-.13,0a4.31,4.31,0,0,0-5,1.89,3.72,3.72,0,0,0-.39.83,4.32,4.32,0,0,0,2.68,5.48c.94.33,1.88.64,2.83.94a4.51,4.51,0,0,0,1.3.2,4.32,4.32,0,0,0,4-5.85Z"
          transform="translate(-95.76 -69.58)"
        />
      </g>
      <path
        id="claw"
        d="M252.94,195.21l-37.08,6.53-.06-9.84,37.09-6.54Zm64.66-55.76a3.93,3.93,0,0,0-4.66-4.11l-157.6,27.79a5.91,5.91,0,0,0-4.61,5.74l.05,9.85c.07,13.59,10.5,22.79,23.3,20.53l32.45-5.72.08,14.77a3.93,3.93,0,0,0,4.66,4.11l18.54-3.27.17,32.57-40.31,55a5.55,5.55,0,0,0-.84,5.27l18.8,46a3.81,3.81,0,0,0,4.33,2.34,4.7,4.7,0,0,0,1.71-.64,5.84,5.84,0,0,0,2.57-6.86h0l-17.71-43.33,31.51-43,.44,85.65a3.93,3.93,0,0,0,4.66,4.11,5.93,5.93,0,0,0,4.61-5.75l-.44-85.64,31.9,31.83L254,336.11c-.94,2.7.23,5.36,2.62,5.95a3.59,3.59,0,0,0,.93.11,4.29,4.29,0,0,0,.79-.07,5.82,5.82,0,0,0,4.3-3.86l18.28-52.51a4.76,4.76,0,0,0-.88-5l-40.76-40.69-.17-32.57,18.54-3.27a5.91,5.91,0,0,0,4.61-5.74l-.07-14.77L294.6,178c12.81-2.26,23.13-15.11,23.06-28.71Zm-23.05,28.7L174,189.4c-7.68,1.36-13.94-4.16-14-12.32l0-4.92L308.36,146l0,4.93C308.43,159.09,302.23,166.8,294.55,168.15Z"
        transform="translate(-95.76 -69.58)"
      />
    </g>
  </svg>
);