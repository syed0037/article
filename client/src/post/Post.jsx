import { Link } from 'react-router-dom'
import './post.css'

export default function post({post}) {
    
   
    return (
        <div className="post">
           
            <div className="postInfo">
               
                <span className="postTitle">
                    <Link className="link" to={`/post/${post._id}`}>
                        {post.Title} 
                    </Link>
                </span>
                <hr/>
              
            </div>
            <p className="postDesc">
                {post.Content}
            </p>
           </div>
    )
}
