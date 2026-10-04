import React, { useState, useMemo, useCallback, Suspense } from 'react'
import VirtualTable from './VirtualTable'

const LazyProductModal = React.lazy(() => import('./OptimizedProductModal'))

export default function OptimizedList({ products }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    return products.filter((item) => {
      const matchSearch = term === '' || item.name.toLowerCase().includes(term)
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory
      return matchSearch && matchCategory
    })
  }, [products, searchTerm, selectedCategory])

  const stats = useMemo(() => {
    let totalStock = 0
    let totalValue = 0
    for (let i = 0; i < filteredProducts.length; i++) {
      totalStock += filteredProducts[i].stock
      totalValue += filteredProducts[i].stock * filteredProducts[i].price
    }
    return {
      count: filteredProducts.length,
      totalStock,
      totalValue
    }
  }, [filteredProducts])

  const handleSelect = useCallback((item) => {
    setSelectedProduct(item)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  return (
    <div>
      <div className="box stats-grid">
        <div className="stat-item">
          <strong>Tổng sản phẩm:</strong> {stats.count.toLocaleString('vi-VN')}
        </div>
        <div className="stat-item">
          <strong>Tổng tồn kho:</strong> {stats.totalStock.toLocaleString('vi-VN')}
        </div>
        <div className="stat-item">
          <strong>Tổng giá trị kho:</strong> {stats.totalValue.toLocaleString('vi-VN')} đ
        </div>
      </div>

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

        <span>Hiển thị (ảo hóa ~20 DOM nodes): <strong>{filteredProducts.length}</strong> / {products.length}</span>
      </div>

      <VirtualTable items={filteredProducts} onSelect={handleSelect} />

      {selectedProduct && (
        <Suspense fallback={<div className="box">Đang tải modal...</div>}>
          <LazyProductModal product={selectedProduct} onClose={handleClose} />
        </Suspense>
      )}
    </div>
  )
}
