import * as React from 'react';
import styles from './ContentContainer.module.scss';

type Props = {
  children: React.ReactNode;
};

const ContentContainer: React.FC<Props> = (props) => <div className={styles['outer-content-wrapper']}>{props.children}</div>;

export default ContentContainer;
