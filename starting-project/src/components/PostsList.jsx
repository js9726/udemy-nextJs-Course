import { useState , useEffect} from 'react';

import Post from './Post';
import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from './Modal';


function PostList( {isPosting,onStopPosting} ) {
    // fetch('http://localhost:8080/posts').then(response=>response.json()).then(data=>{
    //     setPosts(data.posts);
    // })
    const[posts,setPosts] = useState([]);

    useEffect(()=>{
        async function fetchPosts(){
            const response = await fetch('http://localhost:8080/posts');
            const resData = await response.json();
            setPosts(resData.posts);
        }
        fetchPosts();
       },[]) 
       //This prevent infinite loop, using useEffect hook
       //useEffect hook runs after every render cycle, but we can add a second argument which is a list of dependencies
       //if we add an empty list, it will run only once, if we add a list of dependencies, it will run only when the dependencies chang
    
        
    function addPostHandler(postData){
        fetch('http://localhost:8080/posts',{
            method:'POST',
            body:JSON.stringify(postData),
            headers: {
                'Content-Type':'application/json'
            }
        })
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
                {posts.map((post) => <Post key={post.body} author={post.author} body={post.body} />)}

            </ul>
        </>
    );
    
}

export default PostList 