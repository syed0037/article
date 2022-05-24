import axios from 'axios';
import { useLocation } from 'react-router';
import './singlePost.css';
import {useContext, useEffect,useState} from 'react';
import { Link } from 'react-router-dom';

// import { Context } from '../context/Context';



export default function SinglePost() {
    const location=useLocation();
    const path=(location.pathname.split('/')[2]);
    const [post,setPost]=useState([]);
    
    // const {user}=useContext(Context);
    const [Title,setTitle]=useState("");
    const [Content,setContent]=useState("");
    const [updateMode,setUpdateMode]=useState(false);
   const user= localStorage.getItem('user')


    useEffect(() => {
        const getPost=async () => {
            const res=await axios.get("/articles/"+ path);
            // console.log(res.data);
            setPost(res.data);
            setTitle(res.data.Title);
            setContent(res.data.Content);
        };
        getPost()
    }, [path]);

    const handleDelete=async()=>{
        try{
            await axios.delete("/articles/"+ path , {data:{User:user}});
            window.location.replace("/home");
        }catch(err){

        }
        
    }
    const handleUpdate=async()=>{
        try{
            await axios.put(`/articles/${post._id}` , {User:user,Title,Content});
            setUpdateMode(false)
        }catch(err){

        }
    }

    return (
        <div className="singlePost">
            <div className="singlePostwrapper">
              
                {
                    updateMode?<input type="text" value={Title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/>:(
                        <h1 className="singlePostTitle">
                        {Title} 
                        {post.User == user? (
                              <div className="singlePostEdit">
                              <button className="singlePostIcon" onClick={()=>setUpdateMode(true)}>UPDATE POST</button>
                              <button className="singlePostIcon" onClick={handleDelete}>DELETE POST</button>
                              </div>
                        ):console.log("wrong user")}
                        
                     </h1>
                    )
                }
       
            <div className="singlePostInfo">
                <span className="singlePostAuthor">Author:
               <Link to={`/?user=${post.User}`} className="link">
               <b> {post.User}</b>
               </Link>
                </span>
                {/* <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span> */}
            </div>
         {
             updateMode ? <textarea value={Content} className="singlePostDescInput" onChange={(e)=>setContent(e.target.value)}/>:(
                <p className="singlePostDesc">
                {Content}
            
            </p>
             )
         }
         {
             updateMode && ( <button className="singlePostButton" onClick={handleUpdate}>Update</button>)
         }
        
           
            </div>
        </div>
    )
}
