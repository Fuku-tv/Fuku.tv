// import * as React from 'react';

// import './ScreenNavigation.scss';

// interface tabListArray  {
//   name: string;
// }

// interface Props = {
//   tabList: tabListArray[]
// }

// const ScreenNavigation: React.FC <Props> = ({tabList}) => {
//   const [activeTab, setActiveTab] = React.useState<string>(null);

//   return (
//     <div id="applied-items">
//       <div className="applied-item-group-titles">
//        tabList.map(tab=>  <button
//           onClick={() => setActiveTab(tab)}
//           onKeyDown={() => setActiveTab(activeTab)}
//           className={`applied-item__title ${activeTab === tab && 'active'}`}
//         >
//           <h3>{tab}</h3>
//         </button>)

//       </div>
//       <div className="applied-item__container">{activeTab === tab ? playerTitleStats : playerTitleAppliedStats}</div>
//     </div>
//   );
// };

// export default ScreenNavigation;
