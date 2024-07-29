import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from '@/components/Buttons/ThemeToggle';
import { useTheme } from 'next-themes';

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

jest.mock('@react-icons/all-files/fi/FiSun', () => ({
  FiSun: () => <span>Sun Icon</span>,
}));

jest.mock('@react-icons/all-files/fi/FiMoon', () => ({
  FiMoon: () => <span>Moon Icon</span>,
}));

describe('ThemeToggle Component', () => {
  let setTheme: jest.Mock;

  beforeEach(() => {
    setTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme,
    });
  });

  it('renders correctly and toggles theme', () => {

    const { rerender } = render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /Switch to dark mode/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Moon Icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(setTheme).toHaveBeenCalledWith('dark');

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme,
    });

    rerender(<ThemeToggle />);
    expect(screen.getByText('Sun Icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
