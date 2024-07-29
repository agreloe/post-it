import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomLink from '@/components/Buttons/CustomLink';

jest.mock('next/link', () => {
  return ({ href, children, ...props }) => {
    return <a href={href} {...props}>{children}</a>;
  };
});

describe('CustomLink Component', () => {
  it('renders the link correctly', () => {
    render(<CustomLink href="/test" label="Go to test page">Test Link</CustomLink>);

    const link = screen.getByRole('link', { name: /go to test page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('renders the SVG correctly', () => {
    render(<CustomLink href="/test" label="Go to test page">Test Link</CustomLink>);

    const svg = screen.getByTestId('custom-link-svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('stroke-primary-light');
  });

  it('renders the label correctly', () => {
    render(<CustomLink href="/test" label="Go to test page">Test Link</CustomLink>);

    const link = screen.getByRole('link', { name: /go to test page/i });
    expect(link).toHaveAttribute('aria-label', 'Go to test page');
  });
});
