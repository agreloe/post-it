import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthButton from '@/components/Buttons/AuthButton';

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  useFormStatus: jest.fn(),
}));

describe('AuthButton Component', () => {
  it('renders correctly with "Sign In" text when not pending', () => {
    const useFormStatus = require('react-dom').useFormStatus;
    useFormStatus.mockReturnValue({ pending: false });

    render(<AuthButton />);

    const button = screen.getByRole('button', { name: /sign into your account/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Sign In');
  });

  it('renders correctly with "Loading..." text when pending', () => {
    const useFormStatus = require('react-dom').useFormStatus;
    useFormStatus.mockReturnValue({ pending: true });

    render(<AuthButton />);

    const button = screen.getByRole('button', { name: /sign into your account/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });
});
