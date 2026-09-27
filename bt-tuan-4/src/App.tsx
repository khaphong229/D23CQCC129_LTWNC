import React, { useState } from 'react';
import { ProductList } from './components/ProductList';
import { FavoritesList } from './components/FavoritesList';
import { useFavoritesStore } from './favoritesStore';

export const App: React.FC = () => {
  const [tab, setTab] = useState<'products' | 'favorites'>('products');
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="container">
      <header className="header">
        <h1>Quản lý sản phẩm</h1>
        <div className="nav">
          <button
            type="button"
            className={tab === 'products' ? 'active' : ''}
            onClick={() => setTab('products')}
          >
            Tất cả sản phẩm
          </button>
          <button
            type="button"
            className={tab === 'favorites' ? 'active' : ''}
            onClick={() => setTab('favorites')}
          >
            Yêu thích ({favorites.length})
          </button>
        </div>
      </header>

      <main className="content">
        {tab === 'products' ? <ProductList /> : <FavoritesList />}
      </main>
    </div>
  );
};

export default App;
