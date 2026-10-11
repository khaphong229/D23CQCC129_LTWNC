import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart } from '../Cart';
import { renderWithRedux } from '../../../test-utils/renderWithRedux';

describe('Cart Component Integration Tests (RTL)', () => {
  const sampleCartItems = [
    {
      id: 1,
      name: 'Bàn phím cơ DareU EK87',
      price: 650000,
      image: 'keyboard.jpg',
      quantity: 2,
    },
    {
      id: 2,
      name: 'Chuột không dây Logitech G304',
      price: 790000,
      image: 'mouse.jpg',
      quantity: 1,
    },
  ];

  it('1. should render empty state when cart is empty', () => {
    renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: [] },
      },
    });

    expect(screen.getByText('Giỏ hàng của bạn')).toBeInTheDocument();
    expect(screen.getByText(/Giỏ hàng hiện đang trống/i)).toBeInTheDocument();
  });

  it('2. should render list of items and calculate total price correctly', () => {
    renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    expect(screen.getByText('Bàn phím cơ DareU EK87')).toBeInTheDocument();
    expect(screen.getByText('Chuột không dây Logitech G304')).toBeInTheDocument();

    // Tổng số lượng = 2 + 1 = 3 sản phẩm
    expect(screen.getByText(/Tổng số lượng:/i)).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // Tổng tiền = (650.000 * 2) + (790.000 * 1) = 2.090.000 đ
    expect(screen.getByText(/2\.090\.000/i)).toBeInTheDocument();
  });

  it('3. should increase item quantity when clicking + button', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    const plusButtons = screen.getAllByRole('button', { name: '+' });
    await user.click(plusButtons[0]);

    expect(store.getState().cart.items[0].quantity).toBe(3);
  });

  it('4. should decrease item quantity when clicking - button', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    const minusButtons = screen.getAllByRole('button', { name: '-' });
    await user.click(minusButtons[0]);

    expect(store.getState().cart.items[0].quantity).toBe(1);
  });

  it('5. should update quantity when user types directly in the input box', () => {
    const { store } = renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '5' } });

    expect(store.getState().cart.items[0].quantity).toBe(5);
  });

  it('6. should ignore input change when value is not a valid number', () => {
    const { store } = renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: '' } });

    // Số lượng giữ nguyên
    expect(store.getState().cart.items[0].quantity).toBe(2);
  });

  it('7. should remove item when clicking delete button', async () => {
    const user = userEvent.setup();
    const { store } = renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    const removeButtons = screen.getAllByRole('button', { name: 'Xóa' });
    await user.click(removeButtons[0]);

    expect(store.getState().cart.items).toHaveLength(1);
    expect(store.getState().cart.items[0].id).toBe(2);
  });

  it('8. should clear entire cart when clicking clear all button and confirming', async () => {
    const user = userEvent.setup();
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);

    const { store } = renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    const clearAllButton = screen.getByRole('button', { name: /Xóa toàn bộ/i });
    await user.click(clearAllButton);

    expect(confirmSpy).toHaveBeenCalledWith('Bạn có chắc muốn xoá toàn bộ giỏ hàng?');
    expect(store.getState().cart.items).toHaveLength(0);

    confirmSpy.mockRestore();
  });

  it('9. should not clear cart if user cancels confirmation dialog', async () => {
    const user = userEvent.setup();
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);

    const { store } = renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    const clearAllButton = screen.getByRole('button', { name: /Xóa toàn bộ/i });
    await user.click(clearAllButton);

    expect(confirmSpy).toHaveBeenCalled();
    expect(store.getState().cart.items).toHaveLength(2);

    confirmSpy.mockRestore();
  });

  it('10. should show checkout alert and clear cart when checkout button is clicked', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { store } = renderWithRedux(<Cart />, {
      preloadedState: {
        cart: { items: sampleCartItems },
      },
    });

    const checkoutButton = screen.getByRole('button', { name: /Thanh toán đơn hàng/i });
    await user.click(checkoutButton);

    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy.mock.calls[0][0]).toContain('Đặt hàng thành công!');
    expect(store.getState().cart.items).toHaveLength(0);

    alertSpy.mockRestore();
  });
});
