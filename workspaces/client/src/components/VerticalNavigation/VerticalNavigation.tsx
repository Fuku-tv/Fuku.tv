import * as React from 'react';
import NavLinks from '../Header/NavLinks/NavLinks';
import styles from './VerticalNavigation.module.scss';

const VerticalNavigation: React.FC = () => (
  <aside id={styles['vertical-navigation']}>
    <NavLinks />
  </aside>
);

export default VerticalNavigation;
