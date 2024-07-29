import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header';
import { auth } from '@/auth';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('@/components/Buttons/Logout', () => () => <button>Logout</button>);
jest.mock('@/components/Logo', () => () => <div>Logo</div>);
jest.mock('@/components/Buttons/ThemeToggle', () => () => <button>Toggle Theme</button>);
jest.mock('@/components/Buttons/CustomLink', () => ({ href, children }: { href: string, children: React.ReactNode }) => <a href={href}>{children}</a>);

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly for unauthenticated users', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    render(await Header());

    await waitFor(() => {
      expect(screen.getByText('Logo')).toBeInTheDocument();
      expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
      expect(screen.getByText('Sign in')).toBeInTheDocument();
      expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
      expect(screen.queryByText('Posts')).not.toBeInTheDocument();
      expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });
  });

  it('renders correctly for authenticated users', async () => {
    (auth as jest.Mock).mockResolvedValue({ user: { name: 'Test User' } });

    render(await Header());

    await waitFor(() => {
      expect(screen.getByText('Logo')).toBeInTheDocument();
      expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
      expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Posts')).toBeInTheDocument();
      expect(screen.getByText('Logout')).toBeInTheDocument();
    });
  });
});
