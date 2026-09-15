import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Định nghĩa kiểu dữ liệu cho sản phẩm
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

// Em làm thêm phần RTK Query này theo lời khích lệ của đề bài ("khuyến khích thử RTK Query để lấy điểm cộng")
// Dùng API miễn phí từ fakestoreapi.com hoặc dummyjson để lấy sản phẩm
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getProductsFromApi: builder.query<Product[], void>({
      query: () => 'products?limit=8',
      // Map lại dữ liệu từ fakestoreapi về đúng format của bài tập
      transformResponse: (response: any[]): Product[] => {
        return response.map((item) => ({
          id: item.id,
          name: item.title,
          price: Math.round(item.price * 25000), // Quy đổi USD sang VNĐ cho gần gũi
          image: item.image,
          description: item.description,
          category: item.category,
        }));
      },
    }),
  }),
});

// Export hook tự sinh ra từ RTK Query
export const { useGetProductsFromApiQuery } = productsApi;
