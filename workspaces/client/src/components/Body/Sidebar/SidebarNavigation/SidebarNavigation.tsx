import * as React from 'react';
import './SidebarNavigation.scss';
import useNavigationState from 'src/state/hooks/useNavigationState';

interface Tabs {
  tab: string;
  icon: any;
}
interface Props {
  tabs?: Tabs[];
}
const SidebarNavigation: React.FC<Props> = ({ tabs }) => {
  const { state, actions } = useNavigationState();
  return (
    <div style={{ gridTemplateColumns: `repeat(${tabs?.length ?? 0} , 1fr)` }} className="navigation-container">
      {tabs.map((tab) => (
        <NavTab key={tab.tab} actionTab={actions.switchTab} tab={tab.tab} stateTab={state.tab} icon={tab.icon} />
      ))}
    </div>
  );
};

export default SidebarNavigation;
const NavTab = (props) => {
  return (
    <div
      onClick={() => props.actionTab(props.tab)}
      onKeyDown={() => props.actionTab(props.tab)}
      role="button"
      tabIndex={0}
      className={`nav-tab ${props.stateTab === props.tab && 'active'}`}
    >
      <div className="nav-tab__icon">{props.icon}</div>
      <span className="nav-tab__title">{props.tab}</span>
    </div>
  );
};
