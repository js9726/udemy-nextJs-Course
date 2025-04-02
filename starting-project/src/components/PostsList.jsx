import Post from './Post';
import NewPost from './NewPost';
import classes from './PostsList.module.css';
import Modal from './Modal';

function PostList( {isPosting,onStopPosting} ) {

    return(
        <>
            {isPosting ?(<Modal onClose={onStopPosting}>
                <NewPost  
                    onCancel={onStopPosting}/>
            </Modal>
            ) : false}
            <ul id="" className= {classes.posts}>
                <Post author={enteredAuthor} body={enteredBody}/>

            </ul>
        </>
    );
    
}

export default PostList 