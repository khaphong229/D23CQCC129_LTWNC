import React from 'react';
import { useFavoritesStore } from '../favoritesStore';

export const FavoritesList: React.FC = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  if (favorites.length === 0) {
    return (
      <div>
        <h2>Sản phẩm yêu thích</h2>
        <p>Chưa có sản phẩm nào trong danh sách yêu thích.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="fav-header">
        <h2>Sản phẩm yêu thích ({favorites.length})</h2>
        <button type="button" onClick={clearFavorites} className="btn-clear">
          Xóa tất cả
        </button>
      </div>

      <div className="product-list">
        {favorites.map((product) => (
          <div key={product.id} className="product-item">
            <div>
              <h3>{product.name}</h3>
              <p>Giá: {product.price.toLocaleString('vi-VN')} đ</p>
              <p>{product.description}</p>
            </div>
            <div>
              <button
                type="button"
                onClick={() => removeFavorite(product.id)}
                className="btn-danger"
              >
                Xóa khỏi yêu thích
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
