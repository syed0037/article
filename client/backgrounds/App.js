

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Register from './register/Register';
import Login from './login/Login';
import Topbar from './topbar/Topbar';
import Write from './write/Write';
import Home from './home/Home';
import SinglePost from "./singlePost/SinglePost";
function App() {
  return (

   <Router>
     <Routes>
       <Route exact path="/" element={<Register/>}></Route>
       <Route exact path="/login" element={<Login/>}></Route>
       <Route exact path="/topbar" element={<Topbar/>}></Route>
       <Route exact path="/write" element={<Write/>}></Route>
       <Route exact path="/home" element={<Home/>}></Route>
       <Route exact path="/post/:postId" element={<SinglePost/>}></Route>


     </Routes>
   </Router>
  );
}

export default App;
