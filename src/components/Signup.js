import React,{useState} from 'react'
import './Signup.css'
import {NavLink, useHistory} from 'react-router-dom'
const Signup = () => {
    const history=useHistory();
    const [user,setUser]=useState(
        {
           Name:"",
           Email:"",
           Password:"",
           cPassword:"" 
        }
    )
    let name,value;
    const handleInputs=(e)=>
    {
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value})
    }
    const PostData=async (e)=>
        {
         e.preventDefault();
         const {Name,Email,Password,cPassword}=user;
        const res =await fetch('/register',
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                Name,
                Email,
                Password,
                cPassword
            })

        })
        const data= await res.json();
        if(data.status===422 ||data.error==="Please fill all the details")
        {
            window.alert("Invalid Registration");
        }
        else{
            window.alert("Registered Successfully");
            history.push("/login")
        }
        }
    return (
        <div className="signup">
            <div className="container mt-5">
           <h4 className="Signup-header">Sign up</h4>
           <form method="POST" className="register-form">
               <div>
           <div className="formgroup">
               <label htmlFor="Name">
                   <i className="zmdi zmdi-account material-icons-name"></i>
               </label>
                   <input className="name" name="Name" autoComplete="off" value={user.name} onChange={handleInputs} placeholder="Your Name"></input>
           </div>
           <div className="formgroup">
               <label htmlFor="Email">
               <i className="zmdi zmdi-email material-icons-name"></i>
               </label>
                   <input type="email" className="email" name="Email" autoComplete="off" value={user.email} onChange={handleInputs} placeholder="Enter Email"></input>
           </div>
           <div className="formgroup">
               <label htmlFor="Password">
               <i className="zmdi zmdi-lock material-icons-name"></i>
               </label>
                   <input type="password" className="password" name="Password" autoComplete="off" value={user.password} onChange={handleInputs} placeholder="Enter Password"></input>
           </div>
           <div className="formgroup">
               <label htmlFor="cPassword">
               <i className="zmdi zmdi-lock material-icons-name"></i>
               </label>
                   <input type="password" className="cpassword" name="cPassword" autoComplete="off" value={user.cpassword} onChange={handleInputs} placeholder="Confirm Password"></input>
           </div>
           <input type="submit" className="button_register" value="Register" onClick={PostData}/>
           <NavLink className="already" to="/login">I am already registered</NavLink>
           </div>
           <img className="signup_image" alt="image_signup" src="signup.jpg"/>
           </form>
            </div>
        </div>
    )
}

export default Signup
