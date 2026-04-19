import { useState } from 'react';

const ContactForm = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setFormState({ name: '', email: '', message: '' });
        setStatus('success');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-dim mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-surface focus:ring-2 focus:ring-accent focus:outline-none focus-glow bg-white"
            style={{ minHeight: '44px' }}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dim mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-surface focus:ring-2 focus:ring-accent focus:outline-none focus-glow bg-white"
            style={{ minHeight: '44px' }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-dim mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-surface focus:ring-2 focus:ring-accent focus:outline-none focus-glow bg-white"
          style={{ minHeight: '44px' }}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-accent text-white py-3 px-8 rounded-lg hover:bg-accent-alt transition-colors duration-200 font-medium inline-flex items-center"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <div className="toast" role="alert" aria-live="assertive">
          Message sent successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="toast bg-red-500" role="alert" aria-live="assertive">
          Failed to send message. Please try again.
        </div>
      )}
    </form>
  );
};

export default ContactForm;