import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../products/productsSlice';

// 1. Kiểu dữ liệu một món đồ trong giỏ hàng (kế thừa thuộc tính của Product và thêm quantity)
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// 2. Kiểu dữ liệu cho state của giỏ hàng
export interface CartState {
  items: CartItem[];
}

// Khởi tạo giỏ hàng rỗng
const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. Thêm sản phẩm vào giỏ hàng
    // Nếu sản phẩm đã có rồi thì tăng số lượng lên 1
    // Nếu chưa có thì thêm mới vào mảng với quantity là 1
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          image: action.payload.image,
          quantity: 1,
        });
      }
    },

    // 2. Xoá sản phẩm khỏi giỏ hàng dựa theo id
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // 3. Cập nhật số lượng sản phẩm trực tiếp
    // Nếu số lượng người dùng chỉnh <= 0 thì tự động xoá luôn khỏi giỏ
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        const item = state.items.find((item) => item.id === id);
        if (item) {
          item.quantity = quantity;
        }
      }
    },

    // 4. Tăng số lượng sản phẩm lên 1 (tiện gắn vào nút dấu +)
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // 5. Giảm số lượng sản phẩm đi 1 (tiện gắn vào nút dấu -)
    // Nếu còn 1 mà bấm trừ tiếp thì xoá khỏi giỏ luôn
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    // 6. Xoá toàn bộ giỏ hàng (khi thanh toán hoặc bấm làm mới giỏ)
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export các actions để component gọi qua dispatch
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
