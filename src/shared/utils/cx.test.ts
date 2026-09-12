import { describe, expect, it } from 'vitest';
import { cx } from './cx';

describe('cx', () => {
  it('joins truthy classes with spaces', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c');
  });

  it('filters out falsy values', () => {
    expect(cx('a', undefined, null, false, 'b')).toBe('a b');
  });

  it('returns empty string when no class remains', () => {
    expect(cx(undefined, null, false)).toBe('');
  });
});
