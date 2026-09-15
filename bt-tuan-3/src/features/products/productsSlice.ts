import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Định nghĩa kiểu dữ liệu cho sản phẩm (Product)
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

// 2. Kiểu dữ liệu cho state của products
export interface ProductsState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Các trạng thái khi gọi API
  error: string | null;
}

// 3. Dữ liệu sản phẩm mẫu giả lập (toàn đồ dùng quen thuộc của sinh viên tụi em)
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Bàn phím cơ DareU EK87 Tenkeyless',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80',
    description: 'Bàn phím cơ gõ êm, đèn LED RGB học bài ban đêm không sợ ồn bạn cùng phòng',
    category: 'Phụ kiện máy tính',
  },
  {
    id: 2,
    name: 'Chuột không dây Logitech G304 Lightspeed',
    price: 790000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80',
    description: 'Chuột siêu nhạy, pin dùng nửa năm mới phải thay một lần',
    category: 'Phụ kiện máy tính',
  },
  {
    id: 3,
    name: 'Tai nghe Bluetooth chụp tai Sony WH-CH520',
    price: 1190000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    description: 'Nghe nhạc chống ồn, học tiếng Anh hoặc nghe podcast cực chill',
    category: 'Âm thanh',
  },
  {
    id: 4,
    name: 'Bình giữ nhiệt Lock&Lock Swing Tumbler 700ml',
    price: 320000,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
    description: 'Giữ đá từ sáng đến chiều, mang nước lên giảng đường uống tiện lợi',
    category: 'Đời sống',
  },
  {
    id: 5,
    name: 'Balo laptop chống nước học sinh sinh viên',
    price: 380000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    description: 'Chứa vừa laptop 15.6 inch, có ngăn chống sốc đi mưa thoải mái',
    category: 'Thời trang',
  },
  {
    id: 6,
    name: 'Đèn bàn LED bảo vệ mắt chống cận thị',
    price: 260000,
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80',
    description: '3 chế độ sáng tùy chỉnh, cắm cổng USB tiện lợi khi cày deadline đêm',
    category: 'Đời sống',
  },
];

// 4. Dùng createAsyncThunk để giả lập gọi API lấy danh sách sản phẩm theo đúng đề bài
// Em dùng setTimeout trễ 900ms để mô phỏng cảm giác loading như gọi server thật
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Giả vờ đợi mạng phản hồi
      await new Promise((resolve) => setTimeout(resolve, 900));

      // Trả về danh sách mock products
      return MOCK_PRODUCTS;
    } catch (err) {
      return rejectWithValue('Không thể kết nối tới server giả lập!');
    }
  }
);

// 5. Khởi tạo giá trị mặc định ban đầu cho state
const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
};

// 6. Tạo slice bằng createSlice
export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Nếu có action đồng bộ thì viết ở đây, hiện tại fetchProducts xử lý qua extraReducers
  },
  extraReducers: (builder) => {
    builder
      // Khi đang gọi API -> set status là 'loading'
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Khi gọi thành công -> lưu data vào state.items và đổi status thành 'succeeded'
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      // Khi có lỗi -> lưu message lỗi và đổi status thành 'failed'
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Có lỗi xảy ra khi tải sản phẩm!';
      });
  },
});

export default productsSlice.reducer;
