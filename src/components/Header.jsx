import React from 'react'
import './Header.css'

function Header({ onSearch }) {
  return (
    <header className="header">
      <h1 className="title">🎨 Chiikawa 图鉴</h1>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="搜索角色名称..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </header>
  )
}

export default Header
