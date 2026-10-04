import React from 'react'

export default function ProductStats({ products }) {
  let totalStock = 0
  let totalValue = 0

  for (let i = 0; i < products.length; i++) {
    totalStock += products[i].stock
    totalValue += products[i].stock * products[i].price
  }

  return (
    <div className="box stats-grid">
      <div className="stat-item">
        <strong>Tổng sản phẩm:</strong> {products.length.toLocaleString('vi-VN')}
      </div>
      <div className="stat-item">
        <strong>Tổng tồn kho:</strong> {totalStock.toLocaleString('vi-VN')}
      </div>
      <div className="stat-item">
        <strong>Tổng giá trị kho:</strong> {totalValue.toLocaleString('vi-VN')} đ
      </div>
    </div>
  )
}
