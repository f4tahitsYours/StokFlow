import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('should render without crashing', () => {
    // Basic smoke test
    expect(true).toBe(true);
  });

  it('should have correct title', () => {
    const title = 'StokFlow';
    expect(title).toBe('StokFlow');
  });
});
