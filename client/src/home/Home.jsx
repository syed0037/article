 import TopBar from '../topbar/Topbar';
import Posts from '../posts/Posts';
// import Sidebar from '../../sidebar/Sidebar';
import './home.css';
import axios from 'axios';
import {useState,useEffect} from 'react';
import { useLocation } from 'react-router';


export default function Home() {
    const [posts,setPosts]=useState([]);
    const {search}=useLocation();
    useEffect(()=>{
        const fetchPosts=async ()=>{
           const res=await axios.get("/articles" + search);
           console.log(res.data);
           setPosts(res.data)
        }
        fetchPosts();
    },[search]);

    return (
        <>
            <TopBar/>
        <div className="home">

            <Posts posts={posts}/>
            {/* <Sidebar/> */}
        </div>
        </>
    )
}
