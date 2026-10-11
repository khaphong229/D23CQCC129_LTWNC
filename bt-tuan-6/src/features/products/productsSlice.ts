import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Bàn phím cơ DareU EK87 Tenkeyless',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    description: 'Bàn phím cơ gõ êm, đèn LED RGB',
    category: 'Phụ kiện máy tính',
  },
  {
    id: 2,
    name: 'Chuột không dây Logitech G304 Lightspeed',
    price: 790000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
    description: 'Chuột siêu nhạy, thời lượng pin dài',
    category: 'Phụ kiện máy tính',
  },
  {
    id: 3,
    name: 'Tai nghe Bluetooth chụp tai Sony WH-CH520',
    price: 1190000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    description: 'Âm thanh chất lượng cao, pin bền bỉ',
    category: 'Âm thanh',
  },
  {
    id: 4,
    name: 'Bình giữ nhiệt Lock&Lock Swing Tumbler 700ml',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
    description: 'Giữ nhiệt tốt từ sáng đến chiều',
    category: 'Đời sống',
  },
  {
    id: 5,
    name: 'Balo laptop chống nước',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    description: 'Chứa vừa laptop 15.6 inch, có ngăn chống sốc',
    category: 'Thời trang',
  },
  {
    id: 6,
    name: 'Đèn bàn LED bảo vệ mắt',
    price: 260000,
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80',
    description: '3 chế độ sáng tùy chỉnh, cắm cổng USB tiện lợi',
    category: 'Đời sống',
  },
];

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      return MOCK_PRODUCTS;
    } catch (err) {
      return rejectWithValue('Không thể kết nối tới server giả lập!');
    }
  }
);

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Có lỗi xảy ra khi tải sản phẩm!';
      });
  },
});

export default productsSlice.reducer;
