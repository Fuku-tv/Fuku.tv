import * as React from 'react';

import './Input.scss';

interface Props {
  id: string;

  label: string;
  type: string;
  placeholder: string;
}

const Input: React.FC<Props> = ({ id, label, type, placeholder }) => {
  return (
    <div className="form-control">
      <div className="input-wrapper">
        <input id={id} placeholder={placeholder} type={type} />
        <label className="label--float" htmlFor={id}>
          <span className="label-text">{label}</span>
        </label>
      </div>
    </div>
  );
};

export default Input;
