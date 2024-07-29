import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logout from '@/components/Buttons/Logout';
import { logout } from '@/actions/auth';

jest.mock('@/actions/auth');

describe('Logout Component', () => {
  it('calls logout function when button is clicked', () => {
    render(<Logout />);

    const button = screen.getByRole('button', { name: /log out your account/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(logout).toHaveBeenCalled();
  });
});
