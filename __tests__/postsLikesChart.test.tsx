import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostsLikesChart from '@/components/PostsLikesChart';
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

describe('PostsLikesChart Component', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });

    (useFetch as jest.Mock).mockImplementation((url: string) => {
      if (url === '/posts?limit=251') {
        return {
          data: {
            posts: [
              { userId: 1, id: 1, title: 'Post 1', reactions: { likes: 10, dislikes: 1 } },
              { userId: 2, id: 2, title: 'Post 2', reactions: { likes: 20, dislikes: 2 } },
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
    render(<PostsLikesChart />);

    expect(screen.getByText('Top 10 Posts by Likes')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Doughnut Chart')).toBeInTheDocument();
    });
  });

  it('displays loading spinner when fetching data', async () => {
    (useFetch as jest.Mock).mockImplementationOnce(
      () => ({ data: null, error: null, isLoading: true })
    );

    render(<PostsLikesChart />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('displays error message on fetch error', async () => {
    (useFetch as jest.Mock).mockImplementationOnce(
      () => ({ data: null, error: 'Error fetching data', isLoading: false })
    );

    render(<PostsLikesChart />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again later.')).toBeInTheDocument();
    });
  });

  it('displays correct chart data', async () => {
    render(<PostsLikesChart />);

    await waitFor(() => {
      expect(screen.getByText('Doughnut Chart')).toBeInTheDocument();
      expect(screen.getByText('Top 10 Posts by Likes')).toBeInTheDocument();
    });
  });
});
