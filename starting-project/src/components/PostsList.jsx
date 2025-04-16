import { useState } from 'react';

import Post from './Post';
import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from './Modal';

function PostList( {isPosting,onStopPosting} ) {
    const[posts,setPosts] = useState([]);

    function addPostHandler(postData){
        setPosts((prevPosts)=>[postData,...prevPosts]);
    }
    return(
        <>
            {isPosting ?(<Modal onClose={onStopPosting}>
                <NewPost  
                    onCancel={onStopPosting} onAddPost={addPostHandler}/>
            </Modal>
            ) : false}
            <ul id="" className= {classes.posts}>
                {posts.map((post) => <Post author={post.author} body={post.body} />)}

            </ul>
        </>
    );
    
}

export default PostList 