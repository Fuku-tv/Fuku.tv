import * as React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Portal from '../Portal';

import styles from './SideDrawer.module.scss';

interface Props {
  closeDrawer?: () => void;
  show?: boolean;
  children?: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[];
}
const SideDrawer: React.FC<Props> = ({ closeDrawer, show, children }) => {
  const content = (
    <CSSTransition in={show} timeout={500} classNames="sidenav" mountOEnter unmountOnExit>
      <aside className="side-drawer">{children}</aside>
    </CSSTransition>
  );
  return <Portal id="drawer-hook">{content}</Portal>;
};

export default SideDrawer;
