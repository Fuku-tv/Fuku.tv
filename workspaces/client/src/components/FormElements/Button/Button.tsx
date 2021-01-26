import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

interface Props {
  href: any;
  className: any;
  to: any;
  exact: any;
  type: any;
  onClick: any;
  disabled: any;
}

const Button: React.FC<Props> = (props) => {
  const { href, className, to, exact, type, onClick, disabled } = props;

  if (href) {
    return (
      <a className={`button button--${className}`} href={href}>
        {props.children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} exact={exact} className={`button button--${className}`}>
        {props.children}
      </Link>
    );
  }

  return (
    <button className={`button button--${className}`} type={type || 'button'} onClick={onClick} disabled={disabled}>
      {props.children}
    </button>
  );
};

export default Button;
