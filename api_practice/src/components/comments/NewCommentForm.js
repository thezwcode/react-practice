import { useEffect, useRef } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/my-api';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const {quoteId, onCommentAdded, onAddComment} = props;
  const {sendRequest, status} = useHttp(addComment, true);
  const commentTextRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({quoteId: quoteId, comment: {text: commentTextRef.current.value}})
    onAddComment();
    // optional: Could validate here

    // send comment to server
  };

  useEffect(() => {
    if (status==='completed') {
      onCommentAdded();
      commentTextRef.current.value='';
    }
  }, [status, onCommentAdded]);

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
