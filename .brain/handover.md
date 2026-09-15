# 📋 HANDOVER & PROGRESS DOCUMENT

- **Môn học**: Lập trình Web Nâng cao (LTWNC)
- **Bài tập**: Bài tập tuần 3 - Xây dựng Module Giỏ hàng bằng Redux Toolkit
- **Thư mục bài làm**: [bt-tuan-3](file:///d:/Workspace/D23CQCC129_LTWNC/bt-tuan-3)

---

## ✅ ĐÃ HOÀN THÀNH:
1. **Cấu trúc thư mục Feature-based chuẩn**:
   - `src/app/store.ts`: configureStore kết hợp productsSlice, cartSlice, productsApi (RTK Query).
   - `src/app/hooks.ts`: Định nghĩa typed `useAppDispatch` và `useAppSelector`.
   - `src/features/products/`:
     - `productsSlice.ts`: Dùng `createAsyncThunk` (`fetchProducts`) lấy danh sách từ API giả lập (delay 900ms).
     - `productsApi.ts`: Dùng RTK Query để lấy điểm cộng theo khuyến khích của đề bài.
     - `ProductList.tsx`: Hiển thị danh sách sản phẩm, có nút switch chế độ createAsyncThunk vs RTK Query.
   - `src/features/cart/`:
     - `cartSlice.ts`: Hỗ trợ thêm, xoá, cập nhật số lượng (+ / - / input), xoá sạch giỏ hàng.
     - `Cart.tsx`: Giao diện giỏ hàng, tính tổng tiền, thanh toán giả lập.
2. **Type Safety**:
   - Tất cả các component **100% chỉ sử dụng** `useAppDispatch` và `useAppSelector` đã gõ kiểu từ `app/hooks.ts`.
3. **Build & Kiểm thử**:
   - `npm run build` đã build thành công không có bất kỳ lỗi TypeScript nào.
