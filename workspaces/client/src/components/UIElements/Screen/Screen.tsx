import * as React from 'react';
import ContentContainer from '../ContentContainer/ContentContainer';

import './Screen.scss';

interface PROPS {
  id: string;
  title: string;
}

const Screen: React.FC<PROPS> = (props) => (
  <section id={`${props.id}-screen`} className="outer-screen-wrapper">
    <h1 className="screen-title">{props.title}</h1>
    <ContentContainer>{props.children}</ContentContainer>
  </section>
);

export default Screen;
