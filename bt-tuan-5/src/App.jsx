import React, { useState } from 'react'
import { initialProducts } from './mockData'
import UnoptimizedList from './components/UnoptimizedList'

export default function App() {
  const [mode, setMode] = useState('unoptimized')

  return (
    <div className="container">
      <h1>Quản lý 10.000 sản phẩm - Tối ưu ReactJS</h1>

      <div className="toolbar box">
        <strong>Chế độ xem:</strong>
        <button
          className={mode === 'unoptimized' ? 'btn-active' : ''}
          onClick={() => setMode('unoptimized')}
        >
          1. Chưa tối ưu (10.000 DOM nodes)
        </button>
        <button
          className={mode === 'optimized' ? 'btn-active' : ''}
          onClick={() => setMode('optimized')}
        >
          2. Đã tối ưu (Phase 04)
        </button>
      </div>

      {mode === 'unoptimized' ? (
        <UnoptimizedList products={initialProducts} />
      ) : (
        <div className="box">
          <p>Chế độ Tối ưu sẽ được xây dựng ở <strong>Phase 04</strong> sau khi hoàn thành đo Lighthouse ở Phase 03.</p>
        </div>
      )}
    </div>
  )
}
