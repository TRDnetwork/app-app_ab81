import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  test('renders name and role heading', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { name: /jane doe/i })).toBeInTheDocument();
    expect(screen.getByText(/full-stack developer & designer/i)).toBeInTheDocument();
  });

  test('renders introduction paragraph', () => {
    render(<Hero />);

    const intro = screen.getByText(/i build digital experiences that are beautiful, functional, and user-centered./i);
    expect(intro).toBeInTheDocument();
    expect(intro.tagName).toBe('P');
  });

  test('has proper heading hierarchy', () => {
    render(<Hero />);

    const nameHeading = screen.getByRole('heading', { level: 1 });
    expect(nameHeading).toBeInTheDocument();
    expect(nameHeading).toHaveTextContent(/jane doe/i);
  });

  test('applies display font to name', () => {
    render(<Hero />);

    const name = screen.getByRole('heading', { name: /jane doe/i });
    expect(name).toHaveClass('font-display');
  });

  test('role text is visually distinct', () => {
    render(<Hero />);

    const role = screen.getByText(/full-stack developer & designer/i);
    expect(role).toHaveClass('text-accent');
  });

  test('introduction text is properly styled', () => {
    render(<Hero />);

    const intro = screen.getByText(/i build digital experiences/i);
    expect(intro).toHaveClass('text-dim');
    expect(intro).toHaveClass('max-w-2xl');
  });
});