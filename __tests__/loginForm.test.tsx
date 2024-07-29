import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '@/components/LoginForm';
import { loginWithCredentials } from '@/actions/auth';

jest.mock('@/actions/auth', () => ({
  loginWithCredentials: jest.fn(),
}));

jest.mock('@/components/Buttons/AuthButton', () => () => <button type="submit">Sign In</button>);
jest.mock('@/components/Buttons/LoginGithub', () => () => <button>Login with Github</button>);

describe('LoginForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form correctly', () => {
    render(<LoginForm />);

    expect(screen.getByText('Sign in to Post it.')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login with Github/i })).toBeInTheDocument();
  });

  it('submits the form with valid credentials', async () => {
    (loginWithCredentials as jest.Mock).mockResolvedValue({});

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'testuser@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(loginWithCredentials).toHaveBeenCalledWith(expect.any(FormData));
      expect(screen.queryByText('Invalid credentials. Please try again.')).not.toBeInTheDocument();
    });
  });

  it('displays an error message on invalid credentials', async () => {
    (loginWithCredentials as jest.Mock).mockResolvedValue({ error: 'Invalid credentials!' });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'wronguser@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.submit(screen.getByTestId('login-form'));

    await waitFor(() => {
      expect(loginWithCredentials).toHaveBeenCalledWith(expect.any(FormData));
      expect(screen.getByText('Invalid credentials. Please try again.')).toBeInTheDocument();
    });
  });
});
