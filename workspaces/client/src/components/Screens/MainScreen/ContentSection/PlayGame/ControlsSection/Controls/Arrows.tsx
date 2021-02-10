import * as React from 'react';

export const upArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="long-arrow-alt-up"
    className="svg-inline--fa fa-long-arrow-alt-up fa-w-8"
    role="img"
    viewBox="0 0 256 512"
  >
    <path
      fill="currentColor"
      d="M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z"
    />
  </svg>
);

export const downArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="long-arrow-alt-down"
    className="svg-inline--fa fa-long-arrow-alt-down fa-w-8"
    role="img"
    viewBox="0 0 256 512"
  >
    <path
      fill="currentColor"
      d="M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z"
    />
  </svg>
);

export const rightArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="long-arrow-alt-right"
    className="svg-inline--fa fa-long-arrow-alt-right fa-w-14"
    role="img"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"
    />
  </svg>
);

export const leftArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="long-arrow-alt-left"
    className="svg-inline--fa fa-long-arrow-alt-left fa-w-14"
    role="img"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
    />
  </svg>
);

export default {
  upArrow,
  downArrow,
  rightArrow,
  leftArrow,
};
