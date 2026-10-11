# BÀI TẬP TUẦN 6: KIỂM THỬ MODULE GIỎ HÀNG & SẢN PHẨM (REACTJS + REDUX TOOLKIT)

**Môn học:** Lập trình Web Nâng Cao (LTWNC)  
**Mã lớp:** D23CQCC129  
**Sinh viên thực hiện:** Nguyễn Khả Phong  
**Thư mục bài làm:** `bt-tuan-6`  

---

## 🎯 Yêu cầu & Kết quả đạt được

| Yêu cầu đề bài | Kết quả thực hiện | Đánh giá |
| :--- | :--- | :---: |
| Lấy module giỏ hàng/sản phẩm từ Buổi 3–4 | Sao chép đầy đủ từ `bt-tuan-3` sang `bt-tuan-6` | ✅ ĐẠT |
| Tối thiểu 10 test case gồm unit (reducer, hook) & integration (RTL) | **41 test cases** (Unit: 18, Integration: 21, App: 2) | ✅ VƯỢT (410%) |
| Có ít nhất 1 test bất đồng bộ với API được mock | **3 test async**: Mock FakeStore API cho RTK Query & Thunk delay mock | ✅ ĐẠT |
| Chạy `jest --coverage` đạt $\ge 70\%$ | **98.37% Statements, 98.30% Branches, 100% Functions, 99.04% Lines** | ✅ VƯỢT ($\approx 100\%$) |
| Nộp kèm ảnh báo cáo coverage | Đã xuất ảnh đồ hoạ trực quan tại `reports/coverage-report.png` | ✅ ĐẠT |

---

## 🚀 Hướng dẫn chạy

```bash
# Di chuyển vào thư mục bài tập tuần 6
cd bt-tuan-6

# Chạy toàn bộ test suite
npm test

# Chạy test và xuất báo cáo độ bao phủ (Coverage)
npm run test:coverage

# Mở báo cáo HTML chi tiết
start coverage/lcov-report/index.html
```

---

## 📁 Cấu trúc thư mục kiểm thử

```text
bt-tuan-6/
├── src/
│   ├── app/
│   │   ├── __tests__/
│   │   │   └── hooks.test.ts             # Unit test cho typed hooks
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── features/
│   │   ├── cart/
│   │   │   ├── __tests__/
│   │   │   │   ├── cartSlice.test.ts     # 11 Unit tests cho reducer & actions
│   │   │   │   └── Cart.test.tsx         # 10 Integration tests với RTL
│   │   │   ├── Cart.tsx
│   │   │   └── cartSlice.ts
│   │   └── products/
│   │       ├── __tests__/
│   │       │   ├── productsSlice.test.ts # 6 Unit & Async Thunk tests
│   │       │   ├── productsApi.test.ts   # 2 Async tests với Mocked API
│   │       │   └── ProductList.test.tsx  # 8 Integration tests với RTL
│   │       ├── ProductList.tsx
│   │       ├── productsApi.ts
│   │       └── productsSlice.ts
│   ├── test-utils/
│   │   └── renderWithRedux.tsx           # Test helper bọc Redux Provider
│   ├── __tests__/
│   │   └── App.test.tsx                  # 3 Integration tests cho Root App
│   └── App.tsx
├── reports/
│   ├── BAO_CAO_KIEM_THU.md              # Báo cáo kiểm thử chi tiết
│   ├── coverage-report.png               # Ảnh chụp báo cáo độ bao phủ
│   └── generate_report_image.py          # Script sinh ảnh báo cáo
├── babel.config.cjs                      # Cấu hình Babel cho Jest + React 19 + TS
├── jest.config.cjs                       # Cấu hình Jest & Coverage threshold
└── jest.setup.ts                         # Cấu hình Jest DOM matchers & mocks
```
