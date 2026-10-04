import React, { useState } from 'react'
import ProductRow from './ProductRow'
import ProductStats from './ProductStats'
import ProductModal from './ProductModal'

export default function UnoptimizedList({ products }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = products.filter((item) => {
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div>
      <ProductStats products={filteredProducts} />

      <div className="box toolbar">
        <label>Tìm kiếm: </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nhập tên sản phẩm..."
        />

        <label>Danh mục: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">Tất cả</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Gia dụng">Gia dụng</option>
          <option value="Sách">Sách</option>
          <option value="Thể thao">Thể thao</option>
        </select>

        <span>Hiển thị: <strong>{filteredProducts.length}</strong> / {products.length}</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Giá</th>
            <th>Tồn kho</th>
            <th>Đánh giá</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <ProductRow
              key={p.id}
              product={p}
              onSelect={(item) => setSelectedProduct(item)}
            />
          ))}
        </tbody>
      </table>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  )
}
