import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from './ContactForm';

// Mock the fetch API
global.fetch = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  test('renders all form fields and submit button', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('shows error when submitting with empty fields', async () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/all fields are required/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('shows error for invalid email format', async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/valid email address/i)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('submits form successfully and shows success message', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/message sent successfully/i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object));
  });

  test('shows error message when submission fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: 'Something went wrong.' }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  test('hides honeypot field from screen readers and users', () => {
    render(<ContactForm />);

    const honeypot = screen.getByLabelText(/leave this blank/i);
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveAttribute('type', 'text');
    expect(honeypot).toHaveStyle('position: absolute');
    expect(honeypot).toHaveStyle('left: -10000px');
  });
});