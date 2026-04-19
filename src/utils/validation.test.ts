import { validateEmail, validateRequired } from '../utils/validation';

describe('validation utilities', () => {
  describe('validateRequired', () => {
    test('returns true for non-empty strings', () => {
      expect(validateRequired('Hello')).toBe(true);
      expect(validateRequired('   Hello   ')).toBe(true);
    });

    test('returns false for empty or whitespace-only strings', () => {
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired(null as any)).toBe(false);
      expect(validateRequired(undefined as any)).toBe(false);
    });
  });

  describe('validateEmail', () => {
    test('validates correct email formats', () => {
      expect(validateEmail('user@example.com')).toBe(true);
      expect(validateEmail('test+tag@domain.co.uk')).toBe(true);
      expect(validateEmail('my_email@sub.domain.org')).toBe(true);
    });

    test('rejects invalid email formats', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('not-an-email')).toBe(false);
      expect(validateEmail('missing@tld.')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('user@')).toBe(false);
      expect(validateEmail('user@domain')).toBe(false);
      expect(validateEmail(null as any)).toBe(false);
      expect(validateEmail(undefined as any)).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('handles mixed case emails correctly', () => {
      expect(validateEmail('User@Example.COM')).toBe(true);
    });

    test('rejects emails with spaces', () => {
      expect(validateEmail('user @example.com')).toBe(false);
      expect(validateEmail('user@ example.com')).toBe(false);
    });
  });
});