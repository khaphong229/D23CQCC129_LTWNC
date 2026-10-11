import React, { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setupTestStore } from '../../test-utils/renderWithRedux';

describe('App Typed Hooks', () => {
  it('should provide typed dispatch and selector correctly', () => {
    const store = setupTestStore({
      cart: {
        items: [
          {
            id: 99,
            name: 'Test Item',
            price: 50000,
            image: 'img.jpg',
            quantity: 3,
          },
        ],
      },
    });

    const wrapper = ({ children }: PropsWithChildren<{}>) =>
      React.createElement(Provider, { store }, children);

    const { result: dispatchResult } = renderHook(() => useAppDispatch(), { wrapper });
    expect(typeof dispatchResult.current).toBe('function');

    const { result: selectorResult } = renderHook(
      () => useAppSelector((state) => state.cart.items),
      { wrapper }
    );
    expect(selectorResult.current).toHaveLength(1);
    expect(selectorResult.current[0].name).toBe('Test Item');
  });
});
