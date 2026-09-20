import React, { useState } from 'react';
import { useAppSelector } from './app/hooks';
import ProductList from './features/products/ProductList';
import Cart from './features/cart/Cart';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'cart'>('products');

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-brand">
          <h1 className="brand-title">Cửa hàng trực tuyến</h1>
          <p className="brand-subtitle">Bài tập Tuần 3 - Lập trình Web Nâng cao</p>
        </div>

        <nav className="header-nav">
          <button
            type="button"
            className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            Danh sách sản phẩm
          </button>
          <button
            type="button"
            className={`nav-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            Giỏ hàng ({totalCartCount})
          </button>
        </nav>
      </header>

      <main className="app-main">
        {activeTab === 'products' ? <ProductList /> : <Cart />}
      </main>
    </div>
  );
};

export default App;
