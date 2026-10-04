import React, { useState, useEffect } from 'react'
import { initialProducts } from './mockData'
import UnoptimizedList from './components/UnoptimizedList'
import OptimizedList from './components/OptimizedList'

export default function App() {
  const [mode, setMode] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('mode') || 'optimized'
  })

  const switchMode = (newMode) => {
    setMode(newMode)
    const url = new URL(window.location.href)
    url.searchParams.set('mode', newMode)
    window.history.replaceState(null, '', url.toString())
  }

  return (
    <div className="container">
      <h1>Quản lý 10.000 sản phẩm - Tối ưu ReactJS</h1>

      <div className="toolbar box">
        <strong>Chế độ xem:</strong>
        <button
          className={mode === 'unoptimized' ? 'btn-active' : ''}
          onClick={() => switchMode('unoptimized')}
        >
          1. Chưa tối ưu (10.000 DOM nodes)
        </button>
        <button
          className={mode === 'optimized' ? 'btn-active' : ''}
          onClick={() => switchMode('optimized')}
        >
          2. Đã tối ưu (Virtualization + Memo + Lazy)
        </button>
      </div>

      {mode === 'unoptimized' ? (
        <UnoptimizedList products={initialProducts} />
      ) : (
        <OptimizedList products={initialProducts} />
      )}
    </div>
  )
}
