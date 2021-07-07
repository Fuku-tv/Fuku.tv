import * as React from 'react';
import * as styles from './ContentContainer.module.scss';

const ContentContainer: React.FC = (props) => <div className={styles['outer-content-wrapper']}>{props.children}</div>;

export default ContentContainer;
