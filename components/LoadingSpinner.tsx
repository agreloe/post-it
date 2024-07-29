import React from 'react';

const LoadingSpinner = () => (
  <div data-testid="loading-spinner" className='w-full flex justify-center'>
    <svg className="inline-block" width="100px" height="100px" version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 100 100" enableBackground="new 0 0 0 0" xmlSpace="preserve">
      <circle className='fill-primary-light dark:fill-primary-dark' stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1" />
      </circle>
      <circle className='fill-primary-light dark:fill-primary-dark' stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2" />
      </circle>
      <circle className='fill-primary-light dark:fill-primary-dark' stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3" />
      </circle>
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner;
