import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProducts } from './productsSlice';
import type { Product } from './productsSlice';
import { addToCart } from '../cart/cartSlice';
import { useGetProductsFromApiQuery } from './productsApi';

export const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.products.items);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  const [useRtkQuery, setUseRtkQuery] = useState<boolean>(false);

  const {
    data: rtkProducts,
    isLoading: isRtkLoading,
    isError: isRtkError,
  } = useGetProductsFromApiQuery(undefined, { skip: !useRtkQuery });

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setNotification(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  const formatMoney = (amount: number) => {
    return amount.toLocaleString('vi-VN') + ' đ';
  };

  const currentList = useRtkQuery ? rtkProducts || [] : products;
  const isCurrentLoading = useRtkQuery ? isRtkLoading : status === 'loading';
  const isCurrentError = useRtkQuery ? isRtkError : status === 'failed';

  return (
    <div className="product-list-container">
      {notification && <div className="alert-success">{notification}</div>}

      <div className="section-header">
        <div>
          <h2>Danh sách sản phẩm</h2>
          <p className="sub-title">
            Chế độ dữ liệu:{' '}
            <span>{useRtkQuery ? 'RTK Query (Bonus)' : 'createAsyncThunk'}</span>
          </p>
        </div>

        <div className="switch-mode-box">
          <button
            type="button"
            className={`btn-mode ${!useRtkQuery ? 'active' : ''}`}
            onClick={() => setUseRtkQuery(false)}
          >
            createAsyncThunk
          </button>
          <button
            type="button"
            className={`btn-mode ${useRtkQuery ? 'active' : ''}`}
            onClick={() => setUseRtkQuery(true)}
          >
            RTK Query
          </button>
        </div>
      </div>

      {isCurrentLoading && (
        <div className="loading-box">
          <p>Đang tải danh sách sản phẩm...</p>
        </div>
      )}

      {isCurrentError && (
        <div className="error-box">
          <p>Lỗi: {error || 'Không thể tải dữ liệu sản phẩm'}</p>
          {!useRtkQuery && (
            <button
              type="button"
              className="btn-retry"
              onClick={() => dispatch(fetchProducts())}
            >
              Thử lại
            </button>
          )}
        </div>
      )}

      {!isCurrentLoading && !isCurrentError && (
        <div className="products-grid">
          {currentList.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title" title={product.name}>
                  {product.name}
                </h3>
                <p className="product-desc">{product.description}</p>
                <div className="product-footer">
                  <span className="product-price">{formatMoney(product.price)}</span>
                  <button
                    type="button"
                    className="btn-add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
