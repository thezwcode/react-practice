import { useCallback, useState } from 'react';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const addCommentHandler = useCallback(() => {
    setIsAddingComment(true);
  }, []);

  const commentAddedHandler = useCallback(() => {
    setIsAddingComment(false);
  }, [])
  
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      <NewCommentForm quoteId={props.quoteId} onCommentAdded={commentAddedHandler} onAddComment={addCommentHandler}/>
      <p>Comments...</p>
      <CommentsList isAddingComment={isAddingComment} quoteId={props.quoteId}/>
    </section>
  );
};

export default Comments;
