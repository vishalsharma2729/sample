import React from 'react'

export default function Home() {
  return (
    <div className='home'>
      <h1 style={{textAlign:"center"}}>Welcome to Bill management Page </h1><br /><br />
      <h2 style={{ margin:"0 1.5rem"}}>Features of this page</h2>
      <br />
      <ul>
        <li>When you open Billing generator page your cursor already on input field</li>
        <li>You can easily move Backward and Forward to input fields by press enter and backspace</li>
        <li>You can add more input field by press Addfield button</li>
        <li>All calculating value insert in its field automatically</li>
        <li>Date always set automatically when you insert any value in input field</li>
        <li>After bill submit you get a message </li>
        <li>You can Show all data in customer list page</li>
        <li>You can add more products by adding more input fields</li>
        <li>You can also delete extra input field after unnecessary adding fields</li>
      </ul>
    </div>
  )
}
