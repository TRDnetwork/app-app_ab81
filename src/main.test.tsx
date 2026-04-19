import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders main app structure', () => {
    render(<App />);

    // Check for key sections
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '#home');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '#contact');
  });

  test('renders all major sections', () => {
    render(<App />);

    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
    expect(screen.getByTestId('projects-section')).toBeInTheDocument();
    expect(screen.getByTestId('contact-section')).toBeInTheDocument();
  });

  test('has proper page title', () => {
    render(<App />);
    expect(document.title).toBe('Portfolio Pro');
  });

  test('footer contains copyright information', () => {
    render(<App />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveTextContent(/© \d{4} Portfolio Pro/i);
  });
});