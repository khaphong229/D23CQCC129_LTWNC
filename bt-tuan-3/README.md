# 🎓 BÀI TẬP TUẦN 3 - MODULE GIỎ HÀNG REDUX TOOLKIT

- **Môn học**: Lập trình Web Nâng cao (LTWNC)
- **Công nghệ**: ReactJS + TypeScript + Redux Toolkit
- **Thư mục bài làm**: `bt-tuan-3`

---

## 📂 1. Cấu Trúc Thư Mục Feature-Based Chuẩn Đề Bài

```
bt-tuan-3/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── app/
    │   ├── store.ts             # Cấu hình configureStore & kiểu RootState, AppDispatch
    │   └── hooks.ts             # useAppDispatch và useAppSelector đã gõ kiểu chuẩn
    ├── features/
    │   ├── products/
    │   │   ├── productsSlice.ts # Slice sản phẩm dùng createAsyncThunk gọi API giả lập
    │   │   ├── productsApi.ts   # RTK Query (làm thêm để xin điểm cộng ⭐)
    │   │   └── ProductList.tsx  # Giao diện danh sách sản phẩm
    │   └── cart/
    │       ├── cartSlice.ts     # Slice giỏ hàng (thêm, xoá, cập nhật số lượng, reset)
    │       └── Cart.tsx         # Giao diện giỏ hàng và thanh toán
    ├── App.tsx                  # Component chính, quản lý tab và badge số lượng
    ├── main.tsx                 # Bọc Provider store vào ứng dụng
    └── index.css                # Giao diện đơn giản, gọn gàng, responsive
```

---

## 🚀 2. Hướng Dẫn Chạy Chương Trình

1. Mở terminal tại thư mục `bt-tuan-3`:
   ```bash
   cd bt-tuan-3
   ```

2. Chạy dev server:
   ```bash
   npm run dev
   ```

3. Mở trình duyệt truy cập đường dẫn hiển thị trên terminal (thường là `http://localhost:5173`).

---

## 📝 3. Các Tính Năng Đã Thực Hiện

1. **`productsSlice`**:
   - Dùng `createAsyncThunk` (`fetchProducts`) để giả lập độ trễ kết nối API (delay 900ms) trả về danh sách sản phẩm mẫu.
   - Xử lý đầy đủ 3 trạng thái của Promise: `pending` (đang tải), `fulfilled` (thành công), `rejected` (thất bại).
   - **Điểm cộng**: Có thêm file `productsApi.ts` sử dụng RTK Query để lấy dữ liệu từ API online, có nút chuyển đổi trực tiếp trên giao diện để thầy/cô kiểm tra.

2. **`cartSlice`**:
   - `addToCart`: Thêm vào giỏ. Nếu sản phẩm đã có thì tăng số lượng lên 1.
   - `removeFromCart`: Xoá hẳn một sản phẩm khỏi giỏ theo `id`.
   - `updateQuantity`: Cập nhật số lượng tuỳ ý (nếu nhập `<= 0` sẽ tự động xoá).
   - `increaseQuantity` / `decreaseQuantity`: Nút bấm `+` và `-` tiện lợi.
   - `clearCart`: Xoá sạch toàn bộ giỏ hàng khi người dùng bấm thanh toán hoặc làm mới.

3. **Gõ Kiểu & Hooks**:
   - Tất cả các component (`App.tsx`, `ProductList.tsx`, `Cart.tsx`) **100% chỉ sử dụng** `useAppDispatch` và `useAppSelector` được export từ `src/app/hooks.ts`, không dùng trực tiếp hook của `react-redux`.
