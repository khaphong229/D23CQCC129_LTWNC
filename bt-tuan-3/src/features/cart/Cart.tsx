import React from 'react';
// Đề bài: "Toàn bộ component chỉ dùng useAppDispatch/useAppSelector đã gõ kiểu"
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  updateQuantity,
  clearCart,
} from './cartSlice';

export const Cart: React.FC = () => {
  const dispatch = useAppDispatch();

  // Lấy danh sách sản phẩm trong giỏ hàng từ Redux store
  const cartItems = useAppSelector((state) => state.cart.items);

  // Tính tổng số lượng món đồ và tổng số tiền thanh toán
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Hàm format tiền tệ Việt Nam Đồng
  const formatMoney = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' đ';
  };

  // Xử lý khi người dùng gõ số lượng trực tiếp vào ô input
  const handleInputChange = (id: number, valueStr: string) => {
    const value = parseInt(valueStr, 10);
    if (!isNaN(value)) {
      dispatch(updateQuantity({ id, quantity: value }));
    }
  };

  // Giả lập thanh toán
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert(
      `Đặt hàng thành công!\nTổng tiền: ${formatMoney(totalPrice)} (${totalQuantity} sản phẩm).\nCảm ơn bạn đã mua sắm!`
    );
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Giỏ hàng của bạn</h2>
        {cartItems.length > 0 && (
          <button
            type="button"
            className="btn-clear-all"
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn xoá toàn bộ giỏ hàng?')) {
                dispatch(clearCart());
              }
            }}
          >
            Xóa toàn bộ
          </button>
        )}
      </div>

      {/* Trường hợp giỏ hàng trống */}
      {cartItems.length === 0 ? (
        <div className="empty-cart-box">
          <p>Giỏ hàng hiện đang trống.</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="table-responsive">
            <table className="cart-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>STT</th>
                  <th style={{ width: '80px' }}>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th style={{ width: '130px' }}>Đơn giá</th>
                  <th style={{ width: '130px' }}>Số lượng</th>
                  <th style={{ width: '130px' }}>Thành tiền</th>
                  <th style={{ width: '80px' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                    </td>
                    <td>
                      <div className="cart-item-name">{item.name}</div>
                    </td>
                    <td className="text-right">{formatMoney(item.price)}</td>
                    <td>
                      <div className="cart-quantity-controls">
                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          className="input-qty"
                          value={item.quantity}
                          onChange={(e) => handleInputChange(item.id, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn-qty"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-right font-bold">
                      {formatMoney(item.price * item.quantity)}
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn-remove-item"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phần thanh toán và tổng kết */}
          <div className="cart-footer-bar">
            <div className="cart-summary-text">
              <span>Tổng số lượng: <b>{totalQuantity}</b> sản phẩm</span>
              <span className="summary-separator">|</span>
              <span>Tổng tiền thanh toán: <b className="total-price">{formatMoney(totalPrice)}</b></span>
            </div>
            <div className="cart-actions">
              <button
                type="button"
                className="btn-checkout"
                onClick={handleCheckout}
              >
                Thanh toán đơn hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
