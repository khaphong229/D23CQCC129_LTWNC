import React from 'react'

const OptimizedProductRow = React.memo(function OptimizedProductRow({ product, onSelect }) {
  return (
    <tr style={{ height: '40px' }}>
      <td style={{ width: '60px' }}>{product.id}</td>
      <td>{product.name}</td>
      <td style={{ width: '110px' }}>
        <span className="badge">{product.category}</span>
      </td>
      <td style={{ width: '120px' }}>{product.price.toLocaleString('vi-VN')} đ</td>
      <td style={{ width: '80px' }}>{product.stock}</td>
      <td style={{ width: '80px' }}>{product.rating} ★</td>
      <td style={{ width: '90px' }}>
        <button onClick={() => onSelect(product)}>Chi tiết</button>
      </td>
    </tr>
  )
})

export default OptimizedProductRow
