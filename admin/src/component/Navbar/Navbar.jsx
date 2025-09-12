import React from 'react'
import './Navbar.css'
import { asset } from '../../assets/assets'

const Navbar = () => {
  return (
    <div>
      <div className="navbar">
      <img className="logo" src={asset.logofinal} alt="Alkaline Water Logo" />
      <img className="profile" src={asset.logofinal} alt="" />
      </div>
    </div>
  )
}

export default Navbar
