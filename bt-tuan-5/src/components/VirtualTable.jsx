import React, { useState } from 'react'
import OptimizedProductRow from './OptimizedProductRow'

const ROW_HEIGHT = 40
const CONTAINER_HEIGHT = 500
const BUFFER = 3

export default function VirtualTable({ items, onSelect }) {
  const [scrollTop, setScrollTop] = useState(0)

  const totalCount = items.length
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER)
  const endIndex = Math.min(
    totalCount,
    Math.ceil((scrollTop + CONTAINER_HEIGHT) / ROW_HEIGHT) + BUFFER
  )

  const visibleItems = items.slice(startIndex, endIndex)
  const topSpacerHeight = startIndex * ROW_HEIGHT
  const bottomSpacerHeight = Math.max(0, (totalCount - endIndex) * ROW_HEIGHT)

  const handleScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div
      onScroll={handleScroll}
      style={{
        height: `${CONTAINER_HEIGHT}px`,
        overflowY: 'auto',
        border: '1px solid #bbb',
        position: 'relative'
      }}
    >
      <table style={{ margin: 0, width: '100%' }}>
        <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
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
          {topSpacerHeight > 0 && (
            <tr style={{ height: `${topSpacerHeight}px` }}>
              <td colSpan={7} style={{ padding: 0, border: 'none' }} />
            </tr>
          )}

          {visibleItems.map((item) => (
            <OptimizedProductRow
              key={item.id}
              product={item}
              onSelect={onSelect}
            />
          ))}

          {bottomSpacerHeight > 0 && (
            <tr style={{ height: `${bottomSpacerHeight}px` }}>
              <td colSpan={7} style={{ padding: 0, border: 'none' }} />
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
