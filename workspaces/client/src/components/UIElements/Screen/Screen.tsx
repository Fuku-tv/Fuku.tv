import * as React from 'react';
import { css } from '@emotion/css';
import ContentContainer from '../ContentContainer/ContentContainer';

interface PROPS {
  id: string;
  title: string;
}

const Screen: React.FC<PROPS> = (props) => (
  <section
    id={`${props.id}-screen`}
    className={css`
      position: relative;
      padding: 15px;
    `}
  >
    <h1
      className={css`
        font-size: 38px;
        margin-bottom: 25px;
      `}
    >
      {props.title}
    </h1>
    <ContentContainer>{props.children}</ContentContainer>
  </section>
);

export default Screen;
