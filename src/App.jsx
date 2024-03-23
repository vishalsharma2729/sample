import React from 'react'
import Login from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Billingpage from './Pages/Billingpage'
import Sidenav from './components/Sidenav'
import Customerlist from './Pages/Customerlist'
import Home from './Pages/Home'
import { ToastContainer } from 'react-toastify'


export default function App() {
  return (
        <BrowserRouter>
       <Routes>
       <Route path='/sample' element={<Login/>}/>
        <Route path='/nav' element={<Sidenav/>}>
        <Route path='Home' element={<Home/>}/>
            <Route path='billing' element={<Billingpage/>}/>
            <Route path='customer' element={<Customerlist/>}/>
        </Route>
       </Routes>
        </BrowserRouter>
  )
}
