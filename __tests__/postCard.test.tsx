import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostCard from '@/components/PostCard';
import { Post } from '@/types';

jest.mock('@react-icons/all-files/ai/AiFillLike', () => ({
  AiFillLike: () => <span>AiFillLike Icon</span>,
}));

jest.mock('@react-icons/all-files/ai/AiFillDislike', () => ({
  AiFillDislike: () => <span>AiFillDislike Icon</span>,
}));

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  body: 'This is a test post.',
  userId: 1,
  reactions: {
    likes: 10,
    dislikes: 2,
  },
};

describe('PostCard Component', () => {
  it('renders the post data correctly', () => {
    render(<PostCard post={mockPost} />);

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('This is a test post.')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('increments likes count when like button is clicked', () => {
    render(<PostCard post={mockPost} />);

    const likeButton = screen.getByText('10').closest('button');
    fireEvent.click(likeButton!);

    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it('decrements likes count when like button is clicked again', () => {
    render(<PostCard post={mockPost} />);

    const likeButton = screen.getByText('10').closest('button');
    fireEvent.click(likeButton!);
    fireEvent.click(likeButton!);

    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('increments dislikes count when dislike button is clicked', () => {
    render(<PostCard post={mockPost} />);

    const dislikeButton = screen.getByText('2').closest('button');
    fireEvent.click(dislikeButton!);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('decrements dislikes count when dislike button is clicked again', () => {
    render(<PostCard post={mockPost} />);

    const dislikeButton = screen.getByText('2').closest('button');
    fireEvent.click(dislikeButton!);
    fireEvent.click(dislikeButton!);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('toggles like and dislike states correctly', () => {
    render(<PostCard post={mockPost} />);

    const likeButton = screen.getByText('10').closest('button');
    const dislikeButton = screen.getByText('2').closest('button');

    fireEvent.click(likeButton!);
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(dislikeButton!);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    fireEvent.click(dislikeButton!);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(likeButton!);
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
