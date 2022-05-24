import React, { useRef } from 'react'
import './login.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
// import { Context } from '../context/Context';
import { useDispatch } from 'react-redux'
import {useContext} from 'react';


export default function Login() {
    const emailRef=useRef();
    const passwordRef=useRef();
    // const{dispatch,isFetching}=useContext(Context)
    const handleSubmit=async (e,dispatch)=>{
       
        e.preventDefault();
        //    dispatch({type:"LOGIN_START"});
        try{
            
            const res=await axios.post("/login",{
                email:emailRef.current.value,
                password:passwordRef.current.value,
            });
            //   dispatch({type:"LOGIN_SUCCESS",payload:res.data});
           console.log(res.config.data);
          if(res.data=="logged in successfully"){
             console.log("in login");
                 window.open('/home',"_self")
          }
          const u=(JSON.parse(res.config.data)["email"]);
          localStorage.setItem('user',u)
        }catch(err){
            alert("please enter valid email id and password");
            //   dispatch({type:"LOGIN_FAILURE"});
            console.log(err);
        }
        // console.log(user);
    }
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form onSubmit={handleSubmit} className="loginForm">
            <label>Email</label>
            <input type="email" placeholder='Email' ref={emailRef} />
            <label>Password</label>
            <input type="password" placeholder='Password' ref={passwordRef}/>
            <button className='loginButton' type="submit" >Login</button>
        </form>
    </div>
  )
}
