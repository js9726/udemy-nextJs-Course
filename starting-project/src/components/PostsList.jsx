import Post from './Post';
import classes from './PostsList.module.css';

function PostList() {
    const People = "James"
    return(
        <ul id="" className= {classes.posts}>
            <Post author="Jie" body="React.js is awesome"/>
            <Post author="Wenedy" body="is awesome"/>
        </ul>
    );
    
}

export default PostList 