import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { store as appStore } from '../app/store';
import { renderWithRedux } from '../test-utils/renderWithRedux';

describe('App Component Integration Tests', () => {
  it('1. should verify store configuration from store.ts', () => {
    const state = appStore.getState();
    expect(state).toHaveProperty('cart');
    expect(state).toHaveProperty('products');
    expect(state).toHaveProperty('productsApi');
  });

  it('2. should render header, initial products tab, and correct cart count badge', () => {
    renderWithRedux(<App />, {
      preloadedState: {
        cart: {
          items: [
            {
              id: 1,
              name: 'Sample Item',
              price: 100000,
              image: 'img.jpg',
              quantity: 4,
            },
          ],
        },
        products: {
          items: [],
          status: 'succeeded',
          error: null,
        },
      },
    });

    expect(screen.getByText('Cửa hàng trực tuyến')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Giỏ hàng \(4\)/i })).toBeInTheDocument();
  });

  it('3. should navigate between Products and Cart views when clicking tabs', async () => {
    const user = userEvent.setup();
    renderWithRedux(<App />, {
      preloadedState: {
        cart: {
          items: [],
        },
        products: {
          items: [],
          status: 'succeeded',
          error: null,
        },
      },
    });

    const cartTabButton = screen.getByRole('button', { name: /Giỏ hàng \(0\)/i });
    await user.click(cartTabButton);

    // Màn hình Cart được hiển thị
    expect(screen.getByText(/Giỏ hàng hiện đang trống/i)).toBeInTheDocument();

    const productsTabButton = screen.getByRole('button', { name: /Danh sách sản phẩm/i });
    await user.click(productsTabButton);

    // Chuyển lại về màn hình ProductList
    expect(screen.getByRole('heading', { name: /Danh sách sản phẩm/i })).toBeInTheDocument();
  });
});
