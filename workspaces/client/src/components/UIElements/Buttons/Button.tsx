import React from 'react';

export interface Props {
  label: string;
  type: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<Props> = (props) => (
  <button type={props.type} className={props.className}>
    {props.label}
  </button>
);

export default Button;
