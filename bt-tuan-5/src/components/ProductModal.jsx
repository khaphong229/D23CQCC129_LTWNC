import React from 'react'

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#fff',
        border: '2px solid #333',
        padding: '16px',
        width: '380px'
      }}>
        <h2>Chi tiết sản phẩm</h2>
        <p><strong>Mã:</strong> {product.id}</p>
        <p><strong>Tên:</strong> {product.name}</p>
        <p><strong>Danh mục:</strong> {product.category}</p>
        <p><strong>Giá bán:</strong> {product.price.toLocaleString('vi-VN')} đ</p>
        <p><strong>Tồn kho:</strong> {product.stock}</p>
        <p><strong>Đánh giá:</strong> {product.rating} ★</p>
        <button onClick={onClose}>Đóng lại</button>
      </div>
    </div>
  )
}
