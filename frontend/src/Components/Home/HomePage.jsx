import React from 'react'
import './HomePage.css'
export default function HomePage() {
  function login(){
    window.location.href="/login"
  }
  function register(){
    window.location.href="/register"
  }
  return (
    <div className="coverpage">

        
       <h1>Welcome to My WorkApp</h1>
       <div className="buttons">
   <button className="Signin" onClick={login}>Sign In</button>
   <button className="Signup" onClick={register}>Sign Up</button>
       
 </div>
  </div>
  )
}
