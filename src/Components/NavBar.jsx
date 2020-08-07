import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink className="m-2 navbar-link" to="/home"> Home </NavLink>

            <NavLink className="m-2 navbar-link" to="/admin"> Admin </NavLink>
        </div>
    )
}

export default Navbar
