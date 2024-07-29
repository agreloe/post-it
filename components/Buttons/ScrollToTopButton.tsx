import React from 'react'

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button type="button" aria-label="Scroll to the top of the page" className='p-4 rounded-full border border-solid border-primary-light dark:border-primary-dark w-fit bg-background-light dark:bg-background-dark' onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='stroke-primary-light dark:stroke-primary-light' fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V6M5 12l7-7 7 7"/></svg>
        <span className="sr-only">Scroll to the top of the page</span>
    </button>
  )
}

export default ScrollToTopButton;

