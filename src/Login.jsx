import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Login() {
  const navigate =  useNavigate()
   let [logindata,setlogindata] =  useState({
    email:"",
    password:""
   })

    const inputchange = (event)=>{
        let {name,value} = event.target
       setlogindata({
        ...logindata,
       [name]:value
       })
    }

    const submit = (event)=>{
      if(event.key==="Enter"||event.target.innerText==="Login"){
        let {email,password} = logindata
        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        
        if (emailRegex.test(email)&&passwordRegex.test(password)) {
          toast.success("Login successfully");
          setTimeout(() => {
            navigate("/nav/Home")
          }, 1000);
          }else{
            toast.error("invalid email id and password should be b/w 6 to 16 characters")
          }
        }
      }
      return (
        <>
        <div className="background">
        <div className="login-container">
                <label className='label' >Email</label>
                <input className='inp' type="email" 
                id="email" name="email" 
                placeholder="Enter your Email Id"
                onChange={inputchange}/>

                <label className='label' >Password</label>
                <input className='inp' type="password"
                 id="password" name="password"
                  placeholder="Enter your password"
                  onChange={inputchange}
                  onKeyDown={submit}/>

                <button className='loginbtn' onClick={submit} >Login</button>
        </div>
    </div>
    <ToastContainer />
    </>
  )
}
