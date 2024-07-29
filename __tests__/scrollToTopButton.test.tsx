import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ScrollToTopButton from '@/components/Buttons/ScrollToTopButton';

describe('ScrollToTopButton Component', () => {
  it('renders correctly', () => {
    render(<ScrollToTopButton />);
    expect(screen.getByRole('button', { name: /scroll to the top of the page/i })).toBeInTheDocument();
  });

  it('scrolls to top when clicked', () => {
    window.scrollTo = jest.fn();
    render(<ScrollToTopButton />);
    const button = screen.getByRole('button', { name: /scroll to the top of the page/i });
    fireEvent.click(button);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
