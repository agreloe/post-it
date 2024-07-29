import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginGithub from '@/components/Buttons/LoginGithub';
import { login } from '@/actions/auth';

jest.mock('@/actions/auth', () => ({
  login: jest.fn(),
}));

jest.mock('@react-icons/all-files/fa/FaGithub', () => ({
  FaGithub: () => <span>FaGithub Icon</span>,
}));

describe('LoginGithub Component', () => {
  it('calls login function with github provider when button is clicked', () => {
    render(<LoginGithub />);

    const button = screen.getByRole('button', { name: /login with github/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(login).toHaveBeenCalledWith('github');
  });
});
