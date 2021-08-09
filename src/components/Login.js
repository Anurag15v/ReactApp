import React,{useState} from 'react'
import './Login.css'
import {NavLink,useHistory} from 'react-router-dom'
const Login = () => {
    const history=useHistory();
    const [login,userlogin]=useState(
        {
            Email:"",
            Password:""
        }
    )
    let name,value;
    const handleLogin=(e)=>
    {
     name=e.target.name;
     value=e.target.value;
     userlogin({...login,[name]:value})

    }
    const postlogindata=async (e)=>
    {
     e.preventDefault();
     const {Email,Password}=login;
     const res= await fetch('/signin',
     {
         method:"POST",
         headers:{
             "Content-Type":"application/json",
             
         },
         body:JSON.stringify(
             {
                 Email,
                 Password
             }
         )
         
     })
     const data=await  res.json();
    if(data.status===400||data.error==="Invalid Credentials")
    {
     window.alert("Invalid Credentials");
    }
    else{
        window.alert("Successfully Logged In");
        history.push("/");
    }
    }
    return (
        <div>
            <div className="container mt-5">
           <h4 className="Signup-header">logIn</h4>
           <form method="POST" className="register-form">
               <div>
           <div className="formgroup">
               <label htmlFor="Email">
                   <i className="zmdi zmdi-email material-icons-name"></i>
               </label>
                   <input className="email" name="Email" value={login.Email} onChange={handleLogin} autoComplete="off" placeholder="Your Email"></input>
           </div>
           <div className="formgroup">
               <label htmlFor="Password">
                   <i className="zmdi zmdi-lock material-icons-name"></i>
               </label>
                   <input type="password" className="password" name="Password" value={login.Password} onChange={handleLogin} autoComplete="off" placeholder="Enter Password"></input>
           </div>
           <input type="submit" className="button_register"  onClick={postlogindata} value="Log In"/>
           <NavLink className="already" to="/signUp">Create an account</NavLink>
           </div>
           <img alt="image_login" className="signup_image" src="login-background.jpg"/>
           </form>
           </div>
           </div>
    )
}

export default Login
