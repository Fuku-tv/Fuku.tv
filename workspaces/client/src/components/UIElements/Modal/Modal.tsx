import * as React from 'react';

import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.scss';

interface ModalProps {
  show: boolean;
  onCancel?: () => void;
  className?: string;
  style?: unknown;
  onSubmit?: string;
  contentClass?: string;
}

interface ModalOverlayProps {
  onCancel: () => void;
  className?: string;
  style?: unknown;
  onSubmit?: string;
  contentClass?: string;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  const { className, style, onCancel, contentClass } = props;

  const content = (
    <div className={`modal ${className}`} style={style}>
      <button onClick={onCancel} className="modal__close">
        {close}
      </button>

      <div className={`modal__body ${contentClass}`}>{props.children}</div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal: React.FC<ModalProps> = (props) => {
  const { show, onCancel, className, style, onSubmit, contentClass, children } = props;

  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition in={show} timeout={200} classNames="fade-in" mountOnEnter unmountOnExit>
        <ModalOverlay onCancel={onCancel} className={className} style={style} onSubmit={onSubmit} contentClass={contentClass}>
          {children}
        </ModalOverlay>
      </CSSTransition>
    </>
  );
};

export default Modal;

const close = (
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.001 512.001">
    <g>
      <g>
        <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285    L284.286,256.002z" />
      </g>
    </g>
  </svg>
);
