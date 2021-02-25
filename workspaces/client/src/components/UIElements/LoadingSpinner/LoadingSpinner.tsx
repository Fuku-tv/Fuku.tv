import React from 'react';
import './LoadingSpinner.scss';
// import './LoadingSpinner_Square.css';
// import './LoadingSpinner.css';

const squareSpinner = (
  <div className="sk-cube-grid">
    <div className="sk-cube sk-cube1" />
    <div className="sk-cube sk-cube2" />
    <div className="sk-cube sk-cube3" />
    <div className="sk-cube sk-cube4" />
    <div className="sk-cube sk-cube5" />
    <div className="sk-cube sk-cube6" />
    <div className="sk-cube sk-cube7" />
    <div className="sk-cube sk-cube8" />
    <div className="sk-cube sk-cube9" />
  </div>
);

const dotSpinner = (
  <div className="sk-chase">
    <div className="sk-chase-dot" />
    <div className="sk-chase-dot" />
    <div className="sk-chase-dot" />
    <div className="sk-chase-dot" />
    <div className="sk-chase-dot" />
    <div className="sk-chase-dot" />
  </div>
);

interface Props {
  overlay?: boolean;
}

const original = <div className="lds-dual-ring" />;

const LoadingSpinner: React.FC<Props> = ({ asOverlay }) => {
  return <div className="loading-spinner__overlay">{squareSpinner}</div>;
};

export default LoadingSpinner;
