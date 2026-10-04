import React from 'react'

export default function ProductRow({ product, onSelect }) {
  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>
        <span className="badge">{product.category}</span>
      </td>
      <td>{product.price.toLocaleString('vi-VN')} đ</td>
      <td>{product.stock}</td>
      <td>{product.rating} ★</td>
      <td>
        <button onClick={() => onSelect(product)}>Chi tiết</button>
      </td>
    </tr>
  )
}
