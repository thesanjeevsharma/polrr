import React from 'react'

import './Header.scss'

const Header: React.FC = () => {
  return (
    <div className="Header">
      <h2 className="Header__Logo">polrr</h2>
      <ul className="Header__NavList">
        <li> Saved </li>
      </ul>
    </div>
  )
}

export default Header
