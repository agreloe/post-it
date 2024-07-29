import Link from 'next/link';

const CustomLink = ({ href, children, label }: { href: string; children: React.ReactNode; label: string }) => {
  return (
    <div className='relative w-fit group'>
      <Link href={href} className="text-primary-light dark:text-primary-dark group-hover:text-primary-dark dark:group-hover:text-primary-light  underline transition-colors duration-150 ease-in-out" aria-label={label}>
        {children}
      </Link>
      <svg data-testid="custom-link-svg" className="stroke-primary-light dark:stroke-primary-dark transition-all duration-150 ease-in-out group-hover:translate-x-[6px] group-hover:stroke-primary-dark dark:group-hover:stroke-primary-light absolute top-1/2 -translate-y-1/2 left-full opacity-0 group-hover:opacity-100" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg>
    </div>
  );
};

export default CustomLink;
