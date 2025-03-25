import classes from './Post.module.css';

function Post(props) {
    return (
    <div className={classes.posts}>
        <p className={classes.author}>{props.author}</p>
        <p className={classes.body}>{props.body}</p>
    </div>
    );
}


export default Post;