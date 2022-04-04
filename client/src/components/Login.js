import React,{useState} from 'react';
import {Link,useNavigate} from "react-router-dom";

function Login({setAuth}) {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState(""); 
  const [errors,setErrors]=useState([]);

  let navigate = useNavigate();

  const loginHandler= async (e)=> {
    try {
      e.preventDefault();
      const body = { email, password };

      const response= await fetch ("http://localhost:4000/api/login", {
        method:"POST",
        headers: {
          "Content-type":"application/json"
        },
        body:JSON.stringify(body)
      
      });
      const data =await response.json()
      console.log("data",data)

      if (data.token) {
        localStorage.setItem("token",data.token)
        setAuth(true);
      } else {
        setAuth(false);
      }

    }catch(error) {
      console.log(error)
    }
   


  }

  return (
    <div>      
      
    <form onSubmit={loginHandler} className='login-form'>
    {errors && <small style={{color:"red", textAlign:"center", marginTop:"20px"}}>{errors}</small>}

    <label>Email:</label>
    <input type="text" name="email" placeholder='Please type your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>

    <label>Password:</label>
    <input type="password" name="password" placeholder='Please type your password'  value={password} onChange={(e)=>setPassword(e.target.value)}/>

    <div className='register-direction'>
      <p>Not registered already ?</p>
      <Link className='link' to="/register">Register</Link>
    </div>
  

    <button className='btn'>Submit</button>
  </form></div>
  )
}

export default Login