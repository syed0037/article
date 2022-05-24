import { Link } from 'react-router-dom';
// import { Context } from '../context/Context';
import './topbar.css';
import { useContext } from 'react';
export default function TopBar() {
    // const {user,dispatch}=useContext(Context);
    // const handleLogout=()=>{
    //     dispatch({type:"LOGOUT"})
    // }
    // const PF="http://localhost:5000/images/";
    const handleLogout=()=>{
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <div className="top">
         <div className="topLeft">
         <i className="topIcon fab fa-facebook-square"></i>
         <i className="topIcon fab fa-twitter-square"></i>
         <i className="topIcon fab fa-pinterest-square"></i>
         <i className="topIcon fab fa-instagram-square"></i>
         </div>
         <div className="topCenter">
             <ul className="topList">
                 <li className="topListItem">
                     <Link className="link" to="/home">HOME</Link></li>
                 {/* <li className="topListItem"> 
                  <Link className="link" to="/">PROFILE</Link></li> */}
                 {/* <li className="topListItem" > <Link className="link" to="/">CONTACT</Link></li> */}
                 <li className="topListItem">
                     <Link className="link" to="/write">CREATE POST</Link></li>
                 {/* <li className="topListItem" onClick={handleLogout}>{user && "LOGOUT"}</li> */}
             </ul>
         </div>
         <div className="topRight">
             {
                //  user?(<Link to="/settings">
                //   <img className="topImg" src={PF + user.profilePic} width="20" alt="icon"/></Link>):(
                 <div>
                    <li className="topListItem">
                    <button className="lout" onClick={handleLogout}>LOGOUT</button></li>
                    
                     </div>
                //  )
             }
            
         <i className="topSearchIcon fas fa-search"></i>
         </div>
        </div>
    )
}
