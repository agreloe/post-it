"use client";

import React, { useState, useEffect, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const handleError = (error: Error, errorInfo: ErrorInfo) => {
      console.error("Uncaught error:", error, errorInfo);
      setHasError(true);
    };

    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      setHasError(true);
    };

    window.addEventListener('error', handleError as any);
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      window.removeEventListener('error', handleError as any);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, []);

  if (hasError) {
    return (
      <main className="bg-custom flex flex-col items-center absolute top-0 left-0 w-full lg:left-[25%] lg:w-[75%] px-8 py-16 mt-[118px] h-[calc(100vh-120px)] lg:h-screen lg:mt-0">
        <div data-testid="error-boundary" className='flex flex-col gap-8 bg-background-light dark:bg-background-dark p-8 lg:p-24 border border-solid border-primary-light dark:border-primary-dark w-full lg:mt-0 text-text-light dark:text-text-dark'>
          <h1 className='font-bold text-4xl lg:text-6xl'>Oops, looks like something went wrong.</h1>
          <p className="pb-4">Please try again later.</p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
