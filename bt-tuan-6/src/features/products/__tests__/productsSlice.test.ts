import productsReducer, {
  fetchProducts,
  ProductsState,
  Product,
} from '../productsSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('productsSlice Unit and Async Tests', () => {
  const initialEmptyState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
  };

  const sampleProducts: Product[] = [
    {
      id: 1,
      name: 'Bàn phím cơ DareU EK87 Tenkeyless',
      price: 650000,
      image: 'keyboard.jpg',
      description: 'Bàn phím cơ gõ êm',
      category: 'Phụ kiện máy tính',
    },
    {
      id: 2,
      name: 'Chuột không dây Logitech G304',
      price: 790000,
      image: 'mouse.jpg',
      description: 'Chuột siêu nhạy',
      category: 'Phụ kiện máy tính',
    },
  ];

  it('1. should return initial state when passed undefined', () => {
    const state = productsReducer(undefined, { type: 'unknown_action' });
    expect(state).toEqual({
      items: [],
      status: 'idle',
      error: null,
    });
  });

  it('2. should set status to loading when fetchProducts is pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = productsReducer(initialEmptyState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  it('3. should set status to succeeded and populate items when fetchProducts is fulfilled', () => {
    const action = {
      type: fetchProducts.fulfilled.type,
      payload: sampleProducts,
    };
    const state = productsReducer(
      { ...initialEmptyState, status: 'loading' },
      action
    );

    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(sampleProducts);
  });

  it('4. should set status to failed and record error message when fetchProducts is rejected', () => {
    const errorMessage = 'Không thể kết nối tới server giả lập!';
    const action = {
      type: fetchProducts.rejected.type,
      payload: errorMessage,
    };
    const state = productsReducer(
      { ...initialEmptyState, status: 'loading' },
      action
    );

    expect(state.status).toBe('failed');
    expect(state.error).toBe(errorMessage);
  });

  it('5. should fall back to default error message when action.payload is empty on rejection', () => {
    const action = {
      type: fetchProducts.rejected.type,
      payload: undefined,
    };
    const state = productsReducer(
      { ...initialEmptyState, status: 'loading' },
      action
    );

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Có lỗi xảy ra khi tải sản phẩm!');
  });

  describe('Async fetchProducts thunk', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('6. should successfully fetch mock products asynchronously with timers advance', async () => {
      const store = configureStore({
        reducer: {
          products: productsReducer,
        },
      });

      const promise = store.dispatch(fetchProducts());
      expect(store.getState().products.status).toBe('loading');

      // Tăng tốc giả lập thời gian delay 900ms của API
      jest.advanceTimersByTime(900);

      const result = await promise;
      expect(result.type).toBe('products/fetchProducts/fulfilled');
      expect(store.getState().products.status).toBe('succeeded');
      expect(store.getState().products.items.length).toBeGreaterThan(0);
      expect(store.getState().products.items[0].name).toContain('DareU');
    });
  });
});
