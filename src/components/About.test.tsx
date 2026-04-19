import { render, screen } from '@testing-library/react';
import About from './About';

describe('About', () => {
  test('renders about section heading', () => {
    render(<About />);

    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
  });

  test('renders descriptive paragraph', () => {
    render(<About />);

    const paragraph = screen.getByText(/with over 5 years of experience in web development/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph.tagName).toBe('P');
  });

  test('heading uses correct level and styling', () => {
    render(<About />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('font-display');
    expect(heading).toHaveClass('tracking-tighter');
  });

  test('paragraph has proper max-width and line height', () => {
    render(<About />);

    const paragraph = screen.getByText(/with over 5 years of experience/i);
    expect(paragraph).toHaveClass('max-w-3xl');
    expect(paragraph).toHaveClass('leading-relaxed');
  });

  test('content is contained within container', () => {
    render(<About />);

    const container = screen.getByTestId('about-container');
    expect(container).toHaveClass('container');
    expect(container).toHaveClass('py-16');
  });

  test('section has unique ID for navigation', () => {
    render(<About />);

    const section = screen.getByTestId('about-section');
    expect(section).toHaveAttribute('id', 'about');
  });
});