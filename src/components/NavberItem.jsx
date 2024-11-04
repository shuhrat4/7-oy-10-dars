import React from 'react'
import { NavLink } from 'react-router-dom'

function NavberItem({to,icon, title, extreStyle,spanStyle}) {
    return (
        <NavLink className={`text-white ${extreStyle} flex items-center space-x-5  text-[18px] font-bold opacity-[60%]`} to={to}>
           {icon}
           <span className={`${spanStyle}`}>{title}</span> 
        </NavLink>
    )
}

export default NavberItem