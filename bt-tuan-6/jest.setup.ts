import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Mock window.alert and window.confirm
if (typeof window !== 'undefined') {
  window.alert = jest.fn();
  window.confirm = jest.fn(() => true);
}
