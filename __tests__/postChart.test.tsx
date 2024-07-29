import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostsChart from '@/components/PostsChart';
import { useFetch } from '@/hooks/useFetch';
import { useTheme } from 'next-themes';
import '@/__tests__/mocks/matchMedia';

jest.mock('@/hooks/useFetch');
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));
jest.mock('react-chartjs-2', () => ({
  Bar: () => <div>Bar Chart</div>,
  Doughnut: () => <div>Doughnut Chart</div>,
}));

describe('PostsChart Component', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (url === '/users?limit=0') {
        return {
          data: {
            users: [
              { id: 1, firstName: 'John', lastName: 'Doe' },
              { id: 2, firstName: 'Jane', lastName: 'Smith' },
            ],
          },
          error: null,
          isLoading: false,
        };
      }
      if (url === '/posts?limit=0') {
        return {
          data: {
            posts: [
              { userId: 1, id: 1, title: 'Post 1', reactions: { likes: 10 } },
              { userId: 2, id: 2, title: 'Post 2', reactions: { likes: 20 } },
            ],
          },
          error: null,
          isLoading: false,
        };
      }
      return { data: null, error: null, isLoading: true };
    });
  });

  it('renders the chart with posts data', async () => {
    render(<PostsChart />);

    expect(screen.getByText('Top Posters of the week')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Bar Chart')).toBeInTheDocument();
    });
  });

  it('displays loading spinner when fetching data', async () => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      return { data: null, error: null, isLoading: true };
    });

    render(<PostsChart />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays error message on fetch error', async () => {
    (useFetch as jest.Mock).mockImplementation((url: string) => {
      return { data: null, error: 'Error fetching data', isLoading: false };
    });

    render(<PostsChart />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
    });
  });

  it('displays correct chart data', async () => {
    render(<PostsChart />);

    await waitFor(() => {
      expect(screen.getByText('Bar Chart')).toBeInTheDocument();
      expect(screen.getByText('Top Posters of the week')).toBeInTheDocument();
    });
  });
});
