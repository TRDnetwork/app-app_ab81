import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver
class IntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// Mock matchMedia
Object.defineProperty(global, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Extend expect with jest-dom matchers
import { expect } from '@testing-library/jest-dom/extend-expect';

// Silence console.error during tests unless it's an actual problem
vi.spyOn(console, 'error').mockImplementation((message) => {
  if (message.includes('Test was not wrapped in act(...)')) {
    // Ignore known React warnings in tests
    return;
  }
  // Pass through other errors
  process.stderr.write(`console.error: ${message}\n`);
});