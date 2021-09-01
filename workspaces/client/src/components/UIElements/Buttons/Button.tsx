/* eslint-disable react/button-has-type */
import React from 'react';
import type { FC } from 'react';

export interface Props {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: FC<Props> = ({ type = 'button', className, label }) => (
  <button type={type} className={className}>
    {label}
  </button>
);

export default Button;
