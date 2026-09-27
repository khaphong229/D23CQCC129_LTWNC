# BÀI TẬP TUẦN 4 - QUẢN LÝ SẢN PHẨM YÊU THÍCH (ZUSTAND)

- **Môn học**: Lập trình Web Nâng cao (LTWNC)
- **Thư viện State Management**: Zustand
- **Công nghệ**: React 19, TypeScript, Vite

## 1. Cấu trúc thư mục

```
bt-tuan-4/
├── src/
│   ├── components/
│   │   ├── ProductList.tsx     # Danh sách sản phẩm, nút Thích / Bỏ thích
│   │   └── FavoritesList.tsx   # Danh sách sản phẩm đã yêu thích, nút xóa
│   ├── favoritesStore.ts       # Zustand store quản lý state yêu thích
│   ├── data.ts                 # Dữ liệu sản phẩm mẫu
│   ├── App.tsx                 # Điều hướng chuyển tab sản phẩm và yêu thích
│   ├── main.tsx
│   └── index.css
├── package.json
└── vite.config.ts
```

## 2. Cách chạy ứng dụng

```bash
# Cài đặt thư viện
npm install

# Chạy server phát triển
npm run dev

# Build kiểm tra lỗi
npm run build
```

## 3. Chức năng đã thực hiện
- Sử dụng Zustand store `favoritesStore` quản lý state toàn cục độc lập.
- Thêm / Bỏ 1 sản phẩm khỏi danh sách yêu thích (`toggleFavorite`).
- Xóa sản phẩm khỏi danh sách yêu thích (`removeFavorite`).
- Xóa toàn bộ sản phẩm yêu thích (`clearFavorites`).
- Hiển thị số lượng sản phẩm yêu thích theo thời gian thực trên thanh điều hướng.
