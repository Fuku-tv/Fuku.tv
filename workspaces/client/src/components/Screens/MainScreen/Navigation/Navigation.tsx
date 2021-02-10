import * as React from 'react';
import './Navigation.scss';
import useNavigationState from 'src/state/hooks/useNavigationState';

interface TABS {
	tab: string;
	icon: JSX.Element;
}
interface PROPS {
	tabs: TABS[];
}
const Navigation: React.FC<PROPS> = ({ tabs }) => {
	const { state, actions } = useNavigationState();
	return (
		<nav style={{ gridTemplateColumns: `repeat(${tabs.length} , 1fr)` }} className="navigation-container">
			{tabs.map((tab) => (
				<div
					key={tab.tab}
					onClick={() => actions.switchTab(tab.tab)}
					onKeyDown={() => actions.switchTab(tab.tab)}
					role="button"
					tabIndex={0}
					className={`nav-tab ${state.tab === tab.tab && 'active'}`}
				>
					<div className="nav-tab__icon">{tab.icon}</div>
					<div className="tab-container">
						<span className="nav-tab__title">{tab.tab}</span>
						{/* <span className="nav-tab__title">{tab.tab}</span> */}
					</div>
				</div>
			))}
		</nav>
	);
};

export default Navigation;
