import React, { useState } from 'react';
// Đề bài: "Toàn bộ component chỉ dùng useAppDispatch/useAppSelector đã gõ kiểu"
import { useAppSelector } from './app/hooks';
import ProductList from './features/products/ProductList';
import Cart from './features/cart/Cart';

export const App: React.FC = () => {
  // Quản lý tab đang hiển thị: 'products' hoặc 'cart'
  const [activeTab, setActiveTab] = useState<'products' | 'cart'>('products');

  // Lấy tổng số lượng trong giỏ hàng để hiển thị badge trên thanh menu
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      {/* Header sinh viên thân thiện */}
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-logo">🛒</div>
          <div>
            <h1 className="brand-title">Shop Sinh Viên - Redux Toolkit</h1>
            <p className="brand-subtitle">
              Bài tập Tuần 3 | Môn: Lập trình Web Nâng cao (LTWNC)
            </p>
          </div>
        </div>

        {/* Thanh chuyển đổi Tab */}
        <nav className="header-nav">
          <button
            type="button"
            className={`nav-tab ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            📦 Danh Sách Sản Phẩm
          </button>
          <button
            type="button"
            className={`nav-tab ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            🛒 Giỏ Hàng
            {totalCartCount > 0 && (
              <span className="cart-badge">{totalCartCount}</span>
            )}
          </button>
        </nav>
      </header>

      {/* Thanh giới thiệu kiến trúc theo đề bài */}
      <section className="info-bar">
        <div className="info-pill">
          📂 <b>Thư mục:</b> <code>features/products</code>, <code>features/cart</code>,{' '}
          <code>app/store.ts</code>, <code>app/hooks.ts</code>
        </div>
        <div className="info-pill">
          ⚡ <b>Redux Toolkit:</b> <code>createAsyncThunk</code> + RTK Query (Bonus) + <code>useAppDispatch/useAppSelector</code>
        </div>
      </section>

      {/* Nội dung chính tuỳ theo tab */}
      <main className="app-main">
        {activeTab === 'products' ? <ProductList /> : <Cart />}
      </main>

      {/* Footer sinh viên */}
      <footer className="app-footer">
        <p>© 2026 - Bài tập thực hành ReactJS & Redux Toolkit</p>
        <p>Sinh viên thực hiện: Nguyễn Văn Sinh Viên (D23CQCC129)</p>
      </footer>
    </div>
  );
};

export default App;
