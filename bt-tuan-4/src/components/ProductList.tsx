import React from 'react';
import { mockProducts } from '../data';
import { useFavoritesStore } from '../favoritesStore';

export const ProductList: React.FC = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const checkIsFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <div className="product-list">
        {mockProducts.map((product) => {
          const isFav = checkIsFavorite(product.id);
          return (
            <div key={product.id} className="product-item">
              <div>
                <h3>{product.name}</h3>
                <p>Giá: {product.price.toLocaleString('vi-VN')} đ</p>
                <p>{product.description}</p>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(product)}
                  className={isFav ? 'btn-danger' : 'btn-primary'}
                >
                  {isFav ? 'Bỏ thích' : 'Thích'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
