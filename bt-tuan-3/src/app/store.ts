import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
// Em import thêm productsApi nếu muốn dùng RTK Query lấy điểm cộng
import { productsApi } from '../features/products/productsApi';

// Bài tập tuần 3 - Lập trình Web Nâng cao
// Tạo store gom tất cả các slice lại một chỗ
export const store = configureStore({
  reducer: {
    // Reducer quản lý danh sách sản phẩm (dùng createAsyncThunk)
    products: productsReducer,
    // Reducer quản lý giỏ hàng (thêm, xoá, cập nhật số lượng)
    cart: cartReducer,
    // Reducer của RTK Query (để lấy điểm cộng ạ)
    [productsApi.reducerPath]: productsApi.reducer,
  },
  // Thêm middleware cho RTK Query để hỗ trợ caching và fetch
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

// Định nghĩa kiểu RootState và AppDispatch theo chuẩn Redux Toolkit
// Nhờ 2 dòng này mà bên app/hooks.ts gõ kiểu rất chuẩn không lo bị bug
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
