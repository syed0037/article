import './write.css'
import { useState,useContext } from 'react';
import axios from 'axios';
// import { Context } from '../context/Context';
export default function Write() {
    const [Title,setTitle]=useState("");
    const [Content,setDesc]=useState("")
  
    // const {user}=useContext(Context);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const User=localStorage.getItem('user');
        const newPost={
             User,
            Title,
            Content
        };
        // if(file){
        //     const data=new FormData();
           
        //     data.append("name",filename);
        //     data.append("file",file);
           
        //     try{
        //         await axios.post("/upload",data);
        //     }catch(err){

        //     }
        //     }
            try{
                const res=await axios.post("/articles",newPost);
                 console.log(res);
                 window.location.replace("/home");
            }catch(err){

            }
        
      
    }
    return (
        <div className="write">
            {/* {
                file &&
                ( <img src={URL.createObjectURL(file)} className="writeImg" alt=""/>
                )
            } */}
           
            <form action="" className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    
                    {/* <label>Title</label> */}
                    <input type="text" placeholder="Title" className="writeInput" autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="writeFormGroup">
                    {/* <label>Article</label> */}
                    <textarea placeholder="Content" type="text" className="writeInput writeText" cols="30" rows="10" onChange={(e)=>setDesc(e.target.value)}></textarea>
                </div>
              
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
    )
}
