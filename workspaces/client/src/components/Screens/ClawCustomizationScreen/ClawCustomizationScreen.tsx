import * as React from 'react';
import { isMobile } from 'react-device-detect';
import Screen from 'src/components/UIElements/Screen/Screen';
import TableItemTooltip from './Tooltips/TableItemTooltip';
import TableItem from './TableItem/TableItem';
import './ClawCustomizationScreen.scss';

const ClawCustomizationScreen: React.FC = () => {
  // testing const [modalIsActive, 		setModalIsActive] = React.useState < boolean
  // > (false);
  const [appliedItemTab, setAppliedItemTab] = React.useState<string>('Stats');
  const [inventoryIsActive, setInventoryIsActive] = React.useState<boolean>(false);
  const claw = 'https://digitalmarketing.blob.core.windows.net/10030/files/claw.png';

  // const StrongClawTableItem = (props) => {
  //   return (
  //     <div data-tip data-for="table-item-tooltip" className="strong-claw table-item">
  //       <div className="table-item__initials">{props.symbol}</div>
  //       <div className="table-item__icon">{muscle}</div>
  //       <div className="table-item__time-remaining">{props.timeRemainingValue}</div>
  //       <TableItemTooltip
  //         title={props.title}
  //         description={props.description}
  //         descriptionValue={props.descriptionValue}
  //         timeRemainingValue={props.timeRemainingValue}
  //         color="#111111"
  //         backgroundColor="#d59c16"
  //         icon={muscle}
  //       />
  //     </div>
  //   );
  // };
  const LaserTableItem = (props) => {
    return (
      <div data-tip data-for="table-item-tooltip" className="laser table-item">
        <div className="table-item__initials">LP</div>
        <div className="table-item__icon">{laser}</div>
        <div className="table-item__time-remaining">{infiniti}</div>
        <TableItemTooltip
          title={props.title}
          description={props.description}
          descriptionValue={props.descriptionValue}
          timeRemainingValue={props.timeRemainingValue}
          color="#111111"
          backgroundColor="#01ff12"
          icon={laser}
        />
      </div>
    );
  };

  const playerTitleAppliedStats = (
    <>
      <div className="applied-item">
        <div className="applied-item__type">Grip</div>
        <div className="applied-item__value">+ 5</div>
      </div>
      <div className="applied-item">
        <div className="applied-item__type">Time</div>
        <div className="applied-item__value">+ 2</div>
      </div>
      <div className="applied-item">
        <div className="applied-item__type">Overhead Laser</div>
        <div className="applied-item__value">On</div>
      </div>
    </>
  );
  const playerTitleStats = (
    <>
      <div className="applied-item applied-grip">
        <div className="applied-item__type">Grip</div>
        <div className="applied-item__value">
          <progress max="30" value="24" />
          <div className="value">24/30</div>
        </div>
      </div>
      <div className="applied-item applied-time">
        <div className="applied-item__type">Time</div>
        <div className="applied-item__value">
          <progress max="50" value="30" />
          <div className="value">30/50</div>
        </div>
      </div>
      <div className="applied-item applied-speed">
        <div className="applied-item__type">Speed</div>
        <div className="applied-item__value">
          <progress max="30" value="18" />
          <div className="value">18/30</div>
        </div>
      </div>
    </>
  );

  return (
    <Screen id="claw-customization" title="Claw Customization">
      <div className="claw-customization-container">
        <div id="inventory" className=" bordered-box">
          <h2>Inventory</h2>
          <div id="inventory" className={`${inventoryIsActive && 'expanded'} table-container`}>
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
            <div className="table-item" />
          </div>
          {isMobile && (
            <button onClick={() => setInventoryIsActive((i) => !i)} onKeyDown={() => setInventoryIsActive((i) => !i)} className="expand-arrow">
              <div className={`${inventoryIsActive && 'rotate'}   arrow-wrapper`}>{downArrow}</div>
            </button>
          )}
        </div>
        <div id="user-claw" className="bordered-box">
          <div className="user-claw__stats">
            <h2>My Claw</h2>
            <div id="applied-items">
              <div className="applied-item-group-titles">
                <button
                  onClick={() => setAppliedItemTab('Stats')}
                  onKeyDown={() => setAppliedItemTab('Applied')}
                  className={`applied-item__title ${appliedItemTab === 'Stats' && 'active'}`}
                >
                  <h3>Stats</h3>
                </button>
                <button
                  onClick={() => setAppliedItemTab('Applied')}
                  onKeyDown={() => setAppliedItemTab('Applied')}
                  className={`applied-item__title ${appliedItemTab === 'Applied' && 'active'}`}
                >
                  <h3>Applied</h3>
                </button>
              </div>
              <div className="applied-item__container">{appliedItemTab === 'Stats' ? playerTitleStats : playerTitleAppliedStats}</div>
            </div>
            <div id="temporary-items ">
              <h3>Temporary Boosts</h3>
              <div className="table-container">
                <TableItem
                  id="1"
                  symbol="SC"
                  description="Increases the grip of the claw by"
                  title="Strong Claw"
                  descriptionValue="1"
                  timeRemainingValue="18 hours"
                  color="#111111"
                  backgroundColor="#d59c16"
                  classType="strong-claw"
                  icon={muscle}
                />
                <TableItem
                  id="2"
                  symbol="SC4"
                  title="Strong Claw"
                  description="Increases the grip of the claw by"
                  descriptionValue="4"
                  timeRemainingValue="2 days"
                  color="#111111"
                  backgroundColor="#d59c16"
                  classType="strong-claw"
                  icon={muscle}
                />
                <TableItem
                  id="3"
                  symbol="T2"
                  title="Time"
                  description="Increases the the time per round by"
                  descriptionValue="2"
                  timeRemainingValue="3 days"
                  color="#111111"
                  backgroundColor="#a57deb"
                  classType="time"
                  icon={hourglass}
                />
                <div className="table-item" />
                <div className="table-item" />
                <div className="table-item" />
                <div className="table-item" />
                <div className="table-item" />
                <div className="table-item" />
              </div>
            </div>
            <div id="permanant-items ">
              <h3>Permanent</h3>
              <div className="table-container">
                {/* <LaserTableItem /> */}
                <TableItem
                  id="4"
                  symbol="LP"
                  title="Laser"
                  description="Activates a laser pointer for increased accuracy"
                  timeRemainingValue="Permanent"
                  color="#111111"
                  backgroundColor="#01ff12"
                  classType="laser"
                  icon={laser}
                />
                <div className="table-item" />
                <div className="table-item" />
                <div className="table-item" />
                <div className="table-item" />
                <div className="table-item" />
              </div>
            </div>
          </div>
          <div className="user-claw__image-preview ">
            <img src="https://digitalmarketing.blob.core.windows.net/10030/files/claw.png" alt="" />
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default ClawCustomizationScreen;

const downArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="chevron-down"
    className="svg-inline--fa fa-chevron-down fa-w-14"
    role="img"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
    />
  </svg>
);

const infiniti = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="infinity"
    className="svg-inline--fa fa-infinity fa-w-20"
    role="img"
    viewBox="0 0 640 512"
  >
    <path
      fill="currentColor"
      d="M471.1 96C405 96 353.3 137.3 320 174.6 286.7 137.3 235 96 168.9 96 75.8 96 0 167.8 0 256s75.8 160 168.9 160c66.1 0 117.8-41.3 151.1-78.6 33.3 37.3 85 78.6 151.1 78.6 93.1 0 168.9-71.8 168.9-160S564.2 96 471.1 96zM168.9 320c-40.2 0-72.9-28.7-72.9-64s32.7-64 72.9-64c38.2 0 73.4 36.1 94 64-20.4 27.6-55.9 64-94 64zm302.2 0c-38.2 0-73.4-36.1-94-64 20.4-27.6 55.9-64 94-64 40.2 0 72.9 28.7 72.9 64s-32.7 64-72.9 64z"
    />
  </svg>
);

const laser = (
  <svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512">
    <g>
      <g>
        <path d="m262.497 260.11 3.049-3.049c2.929-2.93 2.929-7.678 0-10.607-2.93-2.928-7.678-2.928-10.607 0l-3.049 3.049-16.125-16.125c-2.93-2.928-7.678-2.928-10.607 0l-23.268 23.268-8.982-8.982c-2.93-2.928-7.678-2.928-10.607 0l-58.39 58.389c-2.929 2.93-2.929 7.678 0 10.607 2.93 2.927 7.678 2.929 10.607 0l30.229-30.229 60.822 60.822-89.251 89.251c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l57.822-57.822 12.251 12.25-80.412 80.412c-4.952 4.954-13.011 4.953-17.965.001l-3.269-3.269 6.702-6.703c2.929-2.929 2.929-7.677-.001-10.606-2.928-2.928-7.677-2.929-10.606.001l-22.415 22.416-60.823-60.823 81.479-81.478c2.929-2.93 2.929-7.678 0-10.607-2.929-2.927-7.677-2.929-10.607 0l-86.782 86.781c-1.406 1.407-2.196 3.314-2.196 5.304s.79 3.896 2.196 5.304l8.982 8.982-16.127 16.126c-3.324 3.325-5.155 7.745-5.155 12.446 0 4.702 1.831 9.122 5.155 12.447l28.571 28.571c3.325 3.324 7.745 5.155 12.447 5.155 4.701 0 9.121-1.831 12.446-5.155l16.125-16.125 8.982 8.982c1.407 1.406 3.314 2.196 5.304 2.196s3.896-.79 5.304-2.196l10.41-10.411 3.268 3.269c5.4 5.4 12.495 8.101 19.589 8.101 7.095 0 14.188-2.7 19.59-8.101l85.715-85.716c2.929-2.93 2.929-7.678 0-10.607l-17.554-17.554 48.982-48.983c2.929-2.93 2.929-7.678 0-10.607l-8.982-8.982 23.268-23.268c2.929-2.93 2.929-7.678 0-10.607zm-214.484 236.127c-1.014 1.015-2.665 1.016-3.679 0l-28.571-28.571c-1.015-1.014-1.015-2.665 0-3.679l16.125-16.125 32.25 32.25zm188.162-159.59-60.822-60.822 12.25-12.251 60.822 60.822zm8.572-37.143-32.25-32.25 17.964-17.965 32.251 32.251z" />
        <path d="m118.014 393.985c4.469 4.47 10.411 6.932 16.732 6.932 6.32 0 12.263-2.462 16.732-6.931 9.225-9.226 9.226-24.237-.001-33.465-9.228-9.225-24.238-9.225-33.464 0-4.469 4.47-6.931 10.412-6.931 16.732.001 6.322 2.463 12.265 6.932 16.732zm10.607-22.856c1.688-1.689 3.906-2.533 6.125-2.533 2.218 0 4.437.845 6.125 2.532 3.378 3.378 3.378 8.874 0 12.251-1.636 1.637-3.812 2.538-6.125 2.538-2.314 0-4.489-.901-6.126-2.538-1.636-1.636-2.537-3.811-2.537-6.125s.901-4.489 2.538-6.125z" />
        <path d="m447.678 53.715-4.242 4.242c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l4.242-4.242c2.929-2.93 2.929-7.678 0-10.607-2.931-2.928-7.679-2.928-10.608 0z" />
        <path d="m427.485 73.907-8.7 8.7c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l8.7-8.7c2.929-2.93 2.929-7.678 0-10.607-2.93-2.928-7.678-2.928-10.608 0z" />
        <path d="m279.588 221.805-8.699 8.699c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l8.699-8.699c2.929-2.93 2.929-7.678 0-10.607-2.93-2.928-7.678-2.928-10.608 0z" />
        <path d="m304.237 197.155-8.699 8.699c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l8.699-8.699c2.929-2.93 2.929-7.678 0-10.607-2.93-2.927-7.678-2.927-10.608 0z" />
        <path d="m378.187 123.206-8.7 8.7c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l8.7-8.7c2.929-2.93 2.929-7.678 0-10.607-2.931-2.928-7.679-2.928-10.608 0z" />
        <path d="m402.836 98.557-8.7 8.7c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l8.7-8.7c2.929-2.93 2.929-7.678 0-10.607-2.93-2.928-7.678-2.928-10.608 0z" />
        <path d="m353.537 147.855-8.7 8.7c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l8.7-8.7c2.929-2.93 2.929-7.678 0-10.607-2.93-2.927-7.678-2.927-10.608 0z" />
        <path d="m328.888 172.505-8.7 8.7c-2.929 2.93-2.929 7.678 0 10.607 1.465 1.464 3.385 2.196 5.304 2.196s3.839-.732 5.304-2.196l8.7-8.7c2.929-2.93 2.929-7.678 0-10.607-2.931-2.928-7.679-2.928-10.608 0z" />
        <path d="m487.327 0c-13.604 0-24.673 11.068-24.673 24.673s11.068 24.673 24.673 24.673 24.673-11.069 24.673-24.673-11.068-24.673-24.673-24.673zm0 34.346c-5.334 0-9.673-4.339-9.673-9.673s4.339-9.673 9.673-9.673 9.673 4.339 9.673 9.673-4.339 9.673-9.673 9.673z" />
        <path d="m487.327 66.671c-4.143 0-7.5 3.357-7.5 7.5v14.143c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-14.143c0-4.143-3.357-7.5-7.5-7.5z" />
        <path d="m423.687 32.173h14.143c4.143 0 7.5-3.357 7.5-7.5s-3.357-7.5-7.5-7.5h-14.143c-4.143 0-7.5 3.357-7.5 7.5s3.357 7.5 7.5 7.5z" />
      </g>
    </g>
  </svg>
);

const muscle = (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.009 512.009">
    <g>
      <g>
        <path d="M441.071,192.046l-3.729-0.042c-52,0-98.785,29.068-122.577,74.587c-14.966-6.75-31.194-10.587-48.09-10.587    c-27.913,0-54.163,9.952-74.945,27.285c-0.401-18.324-2.788-36.573-5.117-52.785c-1.995-13.861-3.909-27.31-4.034-38.509    l53.93,0.009c8.542,0,16.583-3.333,22.625-9.375l42.667-42.667c12.195-12.195,12.279-31.755,0.638-44.289    c4.066-6.094,6.003-13.393,5.258-20.846c-0.948-9.573-6.083-18.135-14.094-23.469l-25.896-17.26    c-12.51-8.344-27.083-12.76-42.135-12.76c-31.375,0-60.865,12.219-83.052,34.406C101.654,96.608,69.498,143.4,46.915,194.827    c-27.208,61.958-41,107.667-41,135.844c0,16.146-1.396,29.26-4.156,38.99c-5.896,20.781,3.385,42.948,22.563,53.906    c76.823,43.896,164.198,67.104,252.677,67.104h15.427c54.844,0,109.031-8.792,161.063-26.135l7.469-2.5    c30.531-10.167,51.052-38.635,51.052-70.823V266.765C512.009,226.598,480.186,193.077,441.071,192.046z M490.675,391.213    c0,22.99-14.656,43.323-36.479,50.594l-7.469,2.5c-49.833,16.604-101.75,25.031-154.302,25.031h-15.427    c-84.771,0-168.49-22.229-242.094-64.292c-10.646-6.083-15.833-18.24-12.625-29.563c3.302-11.615,4.969-26.698,4.969-44.813    c0-24.854,13.552-68.854,39.208-127.26c21.5-49,52.167-93.604,91.146-132.583c18.156-18.156,42.292-28.156,67.969-28.156    c10.823,0,21.302,3.177,30.302,9.177l25.896,17.26c2.677,1.781,4.385,4.635,4.698,7.823c0.323,3.198-0.802,6.323-3.063,8.594    l-34.073,34.073c-3.646,3.646-9.198,4.542-13.802,2.24c-3.479-1.74-5.833-4.938-6.458-8.781s0.594-7.625,3.344-10.375l9.802-9.802    c4.167-4.167,4.167-10.917,0-15.083c-4.167-4.167-10.917-4.167-15.083,0l-9.802,9.802c-7.656,7.656-11.063,18.188-9.323,28.885    c1.74,10.688,8.292,19.594,17.979,24.438c12.813,6.396,28.281,3.917,38.427-6.24l23.332-23.332    c2.883,4.154,2.668,9.832-1.03,13.53l-42.667,42.667c-1.99,1.99-4.74,3.125-7.542,3.125l-49.807-0.008    c0.669-1.107,1.311-2.246,2.182-3.117c4.167-4.167,4.167-10.917,0-15.083c-4.167-4.167-10.917-4.167-15.083,0    c-17.448,17.448-13.208,46.938-8.302,81.083c2.542,17.729,5.177,36.063,5.177,54.458c0,43.938-33.25,53.292-34.667,53.667    c-5.667,1.469-9.104,7.229-7.677,12.917c1.208,4.854,5.552,8.083,10.333,8.083c0.854,0,1.729-0.104,2.594-0.323    c12.772-3.191,33.703-15.448,44.224-40.589c0.145-0.194,0.381-0.267,0.516-0.474c17.792-27.521,47.948-43.948,80.677-43.948    c25.479,0,49.479,9.875,67.573,27.813c4.188,4.146,10.948,4.125,15.083-0.063c4.146-4.188,4.125-10.938-0.063-15.083    c-4.935-4.893-10.345-9.112-15.939-12.999c20.049-38.836,59.803-63.668,104.012-63.668l3.156,0.042    c27.667,0.729,50.177,24.677,50.177,53.385V391.213z" />
      </g>
    </g>
  </svg>
);

const hourglass = (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512">
    <g>
      <g>
        <path d="M301.76,273.643c-8.363-2.987-13.76-9.92-13.76-17.664c0-7.723,5.397-14.635,13.76-17.621    c60.779-21.739,92.907-85.717,92.907-185.024c0-5.888-4.779-10.667-10.667-10.667c-5.888,0-10.667,4.779-10.667,10.667    c0,90.752-26.496,146.24-78.741,164.928c-16.96,6.059-27.925,20.885-27.925,37.76c0,16.853,10.965,31.659,27.925,37.717    c52.245,18.688,78.741,74.176,78.741,164.928c0,5.888,4.779,10.667,10.667,10.667c5.888,0,10.667-4.779,10.667-10.667    C394.667,359.36,362.539,295.381,301.76,273.643z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M217.408,218.261c-52.245-18.688-78.741-74.176-78.741-164.928c0-5.888-4.779-10.667-10.667-10.667    s-10.667,4.779-10.667,10.667c0,99.307,32.128,163.285,92.907,185.024c8.363,2.987,13.76,9.92,13.76,17.664    c0,7.723-5.397,14.635-13.76,17.621c-60.779,21.739-92.907,85.717-92.907,185.024c0,5.888,4.779,10.667,10.667,10.667    s10.667-4.779,10.667-10.667c0-90.752,26.496-146.24,78.741-164.928c16.96-6.059,27.925-20.885,27.925-37.76    C245.333,239.125,234.368,224.32,217.408,218.261z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M405.333,0H106.667c-17.643,0-32,14.357-32,32s14.357,32,32,32h298.667c17.643,0,32-14.357,32-32    C437.333,14.357,422.976,0,405.333,0z M405.333,42.667H106.667C100.8,42.667,96,37.888,96,32s4.8-10.667,10.667-10.667h298.667    C411.2,21.333,416,26.112,416,32S411.2,42.667,405.333,42.667z" />
      </g>
    </g>
    <g>
      <g>
        <path d="M405.333,448H106.667c-17.643,0-32,14.357-32,32c0,17.643,14.357,32,32,32h298.667c17.643,0,32-14.357,32-32    C437.333,462.357,422.976,448,405.333,448z M405.333,490.667H106.667C100.8,490.667,96,485.888,96,480    c0-5.888,4.8-10.667,10.667-10.667h298.667C411.2,469.333,416,474.112,416,480C416,485.888,411.2,490.667,405.333,490.667z" />
      </g>
    </g>
  </svg>
);
