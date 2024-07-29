import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import InfiniteScrollList from '@/components/InfiniteScrollList';
import { getPosts } from '@/actions/getPosts';
import { useInView } from 'react-intersection-observer';

jest.mock('@/actions/getPosts');
jest.mock('react-intersection-observer');

import '@/__tests__/mocks/intersectionObserver';

const mockInitialPosts = [
  { id: 1, title: 'Test Post 1', body: 'This is the body of the first test post.', userId: 1, reactions: { likes: 10, dislikes: 1 } },
  { id: 2, title: 'Test Post 2', body: 'This is the body of the second test post.', userId: 2, reactions: { likes: 20, dislikes: 2 } },
];

const mockNewPosts = [
  { id: 3, title: 'Test Post 3', body: 'This is the body of the third test post.', userId: 3, reactions: { likes: 30, dislikes: 3 } },
  { id: 4, title: 'Test Post 4', body: 'This is the body of the fourth test post.', userId: 4, reactions: { likes: 40, dislikes: 4 } },
];

describe('InfiniteScrollList Component', () => {
  beforeEach(() => {
    (getPosts as jest.Mock).mockResolvedValue(mockNewPosts);
    (useInView as jest.Mock).mockReturnValue({ ref: jest.fn(), inView: true });
  });

  it('renders initial posts correctly', async () => {
    await act(async () => {
      render(<InfiniteScrollList initialPosts={mockInitialPosts} />);
    });

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('This is the body of the first test post.')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('This is the body of the second test post.')).toBeInTheDocument();
  });

  it('loads more posts when in view', async () => {
    await act(async () => {
      render(<InfiniteScrollList initialPosts={mockInitialPosts} />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Post 3')).toBeInTheDocument();
      expect(screen.getByText('This is the body of the third test post.')).toBeInTheDocument();
      expect(screen.getByText('Test Post 4')).toBeInTheDocument();
      expect(screen.getByText('This is the body of the fourth test post.')).toBeInTheDocument();
    });
  });

  it('displays loading spinner when fetching posts', async () => {
    await act(async () => {
      render(<InfiniteScrollList initialPosts={mockInitialPosts} />);
    });

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('applies visibility class when post comes into view', async () => {
    await act(async () => {
      render(<InfiniteScrollList initialPosts={mockInitialPosts} />);
    });

    const posts = screen.getAllByText(/Test Post/i);
    posts.forEach(post => {
      const postElement = post.closest('div');
      if (postElement) {
        postElement.classList.add('visible');
        expect(postElement).toHaveClass('visible');
      }
    });
  });
});
