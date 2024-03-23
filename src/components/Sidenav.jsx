import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Sidenav() {
  return (
    <div className='contain'>
    <div className="sidenav">
      <Link to='/nav/Home'>Home</Link>
      <Link to='/nav/customer'>Customer List</Link>
      <Link to='/nav/billing'>Bill Generator</Link>
      <Link to='/sample/'>Logout</Link>
    </div>
    <div className='box'>
      <Outlet/>
    </div>
  </div>
  )
}
