import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
  const mockProject = {
    title: 'E-Commerce Dashboard',
    description: 'A full-stack admin panel with real-time analytics.',
    link: 'https://ecom-dash.example.com',
  };

  test('renders project title and description', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
  });

  test('renders project link with correct href', () => {
    render(<ProjectCard {...mockProject} />);

    const link = screen.getByRole('link', { name: new RegExp(mockProject.title, 'i') });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockProject.link);
  });

  test('applies hover-lift class for animation effect', () => {
    render(<ProjectCard {...mockProject} />);

    const card = screen.getByRole('link');
    expect(card).toHaveClass('hover-lift');
  });

  test('opens link in new tab', () => {
    render(<ProjectCard {...mockProject} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('description is wrapped in a paragraph element', () => {
    render(<ProjectCard {...mockProject} />);

    const description = screen.getByText(mockProject.description);
    expect(description.tagName).toBe('P');
  });

  test('title uses display font with tighter letter-spacing', () => {
    render(<ProjectCard {...mockProject} />);

    const title = screen.getByText(mockProject.title);
    expect(title).toHaveClass('font-display');
    expect(title).toHaveClass('tracking-tighter');
  });
});