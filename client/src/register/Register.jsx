import './register.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
export default function Register() {
    const [first_name,setFirstname]=useState("");
    const [last_name,setLastname]=useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const [err,setErr]=useState(false);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setErr(false);
        try{
        const res=await axios.post("register",{
            first_name,
            last_name,
            email,
            password
        });
         res.data && window.location.replace("/login");
        console.log(res);
    }
        catch(err){
            setErr(true);
        }
        
    }
    return (
        <div className="register">
         <span className="registerTitle">Register</span>  
         <form  className="registerForm" onSubmit={handleSubmit}>
         <label>FirstName</label>
             <input type="text" placeholder="Enter your name" onChange={(e)=>setFirstname(e.target.value)}/>
             <label>LastName</label>
             <input type="text" placeholder="Enter your name" onChange={(e)=>setLastname(e.target.value)}/>
             <label>Email</label>
             <input type="email" pattern="[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-zA-Z]{2,4}" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
             <label>Password</label>
             <input type="password" minlength="8" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
             <button className="registerButton" type="submit">Register</button>
             <p style={{marginTop:"10px",color:"red"}}> {err && "OOPS!!!Something went wrong"}</p>
             </form> 
             <h4>Already have an account </h4>
    
             <button className="registerRegisterButton"><Link className="link" to="/login">Login</Link></button>
        </div>
    )
}
