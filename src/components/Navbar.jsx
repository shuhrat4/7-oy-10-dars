import React from 'react'
import { NavLink } from 'react-router-dom'
import NavberItem from './NavberItem'
import {HomeIcon, LibraryIcon, LikedIcon, PlayListIcon, SearchIcon} from "../assets/Icon"

function Navbar() {
  return (
    <div className='bg-black w-[20%] overflow-y-auto h-[100vh]'>
      <div className='pt-[70px] flex flex-col pl-[30px]'>
        <NavberItem extreStyle={"mb-6 opacity-[60%]"} to={"/"} icon={<HomeIcon/>} title={"Home"}/>
        <NavberItem extreStyle={"mb-6 opacity-[60%]"} to={"/search"} icon={<SearchIcon/>} title={"Search"}/>
        <NavberItem extreStyle={"mb-[49px] opacity-[60%]"} to={"/#"} icon={<LibraryIcon/>} title={"Your Library"}/>
        <NavberItem extreStyle={" mb-5 opacity-[60%]"} to={"/#"} icon={<PlayListIcon/>} title={"Create Playlist"}/>
        <NavberItem spanStyle={"opacity-[60%]"} to={"/Liked"} icon={<LikedIcon/>} title={"Liked Songs"}/>
      </div>
    </div>
    
  )
}

export default Navbar