import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductList } from '../ProductList';
import { renderWithRedux } from '../../../test-utils/renderWithRedux';
import type { Product } from '../productsSlice';

describe('ProductList Component Integration Tests (RTL)', () => {
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: 'Bàn phím cơ DareU EK87',
      price: 650000,
      image: 'keyboard.jpg',
      description: 'Bàn phím cơ DareU gõ êm',
      category: 'Phụ kiện',
    },
    {
      id: 2,
      name: 'Chuột không dây Logitech G304',
      price: 790000,
      image: 'mouse.jpg',
      description: 'Chuột siêu nhạy',
      category: 'Phụ kiện',
    },
  ];

  it('1. should automatically dispatch fetchProducts when status is idle on mount', () => {
    const { store } = renderWithRedux(<ProductList />, {
      preloadedState: {
        products: {
          items: [],
          status: 'idle',
          error: null,
        },
      },
    });

    // Sau khi mount từ trạng thái idle, action fetchProducts được dispatch
    expect(store.getState().products.status).toBe('loading');
  });

  it('2. should show loading spinner when status is loading', () => {
    renderWithRedux(<ProductList />, {
      preloadedState: {
        products: {
          items: [],
          status: 'loading',
          error: null,
        },
      },
    });

    expect(screen.getByText(/Đang tải danh sách sản phẩm/i)).toBeInTheDocument();
  });

  it('3. should show error message and retry button when status is failed', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<ProductList />, {
      preloadedState: {
        products: {
          items: [],
          status: 'failed',
          error: 'Lỗi máy chủ kết nối!',
        },
      },
    });

    expect(screen.getByText(/Lỗi:.*Lỗi máy chủ kết nối!/i)).toBeInTheDocument();
    const retryButton = screen.getByRole('button', { name: /Thử lại/i });
    expect(retryButton).toBeInTheDocument();

    await user.click(retryButton);
    expect(store.getState().products.status).toBe('loading');
  });

  it('4. should show default error message when error string is null', () => {
    renderWithRedux(<ProductList />, {
      preloadedState: {
        products: {
          items: [],
          status: 'failed',
          error: null,
        },
      },
    });

    expect(screen.getByText(/Lỗi: Không thể tải dữ liệu sản phẩm/i)).toBeInTheDocument();
  });

  it('5. should render products cards when status is succeeded', () => {
    renderWithRedux(<ProductList />, {
      preloadedState: {
        products: {
          items: sampleProducts,
          status: 'succeeded',
          error: null,
        },
      },
    });

    expect(screen.getByText('Bàn phím cơ DareU EK87')).toBeInTheDocument();
    expect(screen.getByText('Chuột không dây Logitech G304')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Thêm vào giỏ/i })).toHaveLength(2);
  });

  it('6. should add product to cart and display success notification banner when clicking add to cart', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<ProductList />, {
      preloadedState: {
        products: {
          items: sampleProducts,
          status: 'succeeded',
          error: null,
        },
        cart: {
          items: [],
        },
      },
    });

    const addButtons = screen.getAllByRole('button', { name: /Thêm vào giỏ/i });
    await user.click(addButtons[0]);

    // Giỏ hàng được cập nhật trong store
    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].id).toBe(1);

    // Banner thông báo xuất hiện
    expect(
      screen.getByText('Đã thêm "Bàn phím cơ DareU EK87" vào giỏ hàng thành công!')
    ).toBeInTheDocument();
  });

  it('7. should hide notification banner after 2500ms timer expires', () => {
    jest.useFakeTimers();
    const { store } = renderWithRedux(<ProductList />, {
      preloadedState: {
        products: {
          items: sampleProducts,
          status: 'succeeded',
          error: null,
        },
        cart: {
          items: [],
        },
      },
    });

    const addButtons = screen.getAllByRole('button', { name: /Thêm vào giỏ/i });
    act(() => {
      addButtons[0].click();
    });

    expect(
      screen.getByText('Đã thêm "Bàn phím cơ DareU EK87" vào giỏ hàng thành công!')
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(
      screen.queryByText('Đã thêm "Bàn phím cơ DareU EK87" vào giỏ hàng thành công!')
    ).not.toBeInTheDocument();

    jest.useRealTimers();
  });

  it('8. should toggle between createAsyncThunk and RTK Query mode tabs', async () => {
    const user = userEvent.setup();
    renderWithRedux(<ProductList />, {
      preloadedState: {
        products: {
          items: sampleProducts,
          status: 'succeeded',
          error: null,
        },
      },
    });

    const rtkTabButton = screen.getByRole('button', { name: 'RTK Query' });
    const thunkTabButton = screen.getByRole('button', { name: 'createAsyncThunk' });

    expect(thunkTabButton).toHaveClass('active');
    expect(rtkTabButton).not.toHaveClass('active');

    // Chuyển sang RTK Query
    await user.click(rtkTabButton);
    expect(rtkTabButton).toHaveClass('active');
    expect(thunkTabButton).not.toHaveClass('active');

    // Chuyển lại về createAsyncThunk
    await user.click(thunkTabButton);
    expect(thunkTabButton).toHaveClass('active');
  });
});
