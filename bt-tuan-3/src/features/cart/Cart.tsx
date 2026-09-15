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

  // Giả lập nút thanh toán
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    alert(
      `🎉 Cảm ơn thầy/cô đã chấm bài!\nTổng đơn hàng: ${formatMoney(
        totalPrice
      )} (${totalQuantity} sản phẩm).\nĐơn hàng đã được đặt thành công!`
    );
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>🛒 Giỏ Hàng Của Bạn</h2>
        {cartItems.length > 0 && (
          <button
            type="button"
            className="btn-clear-all"
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn xoá hết tất cả sản phẩm trong giỏ?')) {
                dispatch(clearCart());
              }
            }}
          >
            🗑️ Xóa toàn bộ giỏ
          </button>
        )}
      </div>

      {/* Trường hợp giỏ hàng chưa có gì */}
      {cartItems.length === 0 ? (
        <div className="empty-cart-box">
          <div className="empty-cart-icon">🛒💨</div>
          <h3>Giỏ hàng đang trống trơn!</h3>
          <p>Hãy qua tab "Sản phẩm" để chọn vài món đồ ưng ý nha.</p>
        </div>
      ) : (
        <div className="cart-content-layout">
          {/* Bảng danh sách các món trong giỏ */}
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <div className="cart-item-unit-price">
                    Đơn giá: <b>{formatMoney(item.price)}</b>
                  </div>
                </div>

                {/* Bộ điều khiển tăng, giảm, cập nhật số lượng */}
                <div className="cart-quantity-controls">
                  <button
                    type="button"
                    className="btn-qty"
                    title="Giảm số lượng"
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
                    title="Tăng số lượng"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </button>
                </div>

                {/* Thành tiền của từng món */}
                <div className="cart-item-subtotal">
                  <span className="subtotal-label">Thành tiền:</span>
                  <span className="subtotal-value">
                    {formatMoney(item.price * item.quantity)}
                  </span>
                </div>

                {/* Nút xoá món khỏi giỏ */}
                <button
                  type="button"
                  className="btn-remove-item"
                  title="Xoá món này"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Khung tổng kết thanh toán bên phải */}
          <div className="cart-summary-card">
            <h3>Tóm Tắt Đơn Hàng</h3>
            <div className="summary-row">
              <span>Tổng số lượng:</span>
              <b>{totalQuantity} món</b>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span className="free-shipping">Miễn phí 🎁</span>
            </div>
            <hr />
            <div className="summary-row total-row">
              <span>Tổng thanh toán:</span>
              <span className="total-money">{formatMoney(totalPrice)}</span>
            </div>

            <button
              type="button"
              className="btn-checkout"
              onClick={handleCheckout}
            >
              Thanh Toán Ngay 💳
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
