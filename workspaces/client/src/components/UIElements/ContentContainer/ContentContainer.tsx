import * as React from 'react';
import styles from './ContentContainer.module.scss';

const ContentContainer: React.FC = (props) => <div className={styles['test-weapper']}>{props.children}</div>;

export default ContentContainer;
