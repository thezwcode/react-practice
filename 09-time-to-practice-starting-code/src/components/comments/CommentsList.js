import CommentItem from './CommentItem';
import classes from './CommentsList.module.css';

import { useEffect } from 'react';

import { getAllComments } from '../../lib/my-api';
import useHttp from '../../hooks/use-http';

import LoadingSpinner from '../UI/LoadingSpinner';

const CommentsList = (props) => {
  const {quoteId} = props;
  const {sendRequest, status, error, data:loadedComments} = useHttp(getAllComments, true);
  let showComments = true;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if(status==='pending') {
    return <div className='centered'><LoadingSpinner/></div>
  }

  if (error) {
    return <p className='centered'>{error}</p>
  }

  if (!loadedComments || loadedComments.length === 0) {
    showComments = false;
  }
  return (
    <>
    {showComments &&<ul className={classes.comments}>
      {loadedComments.map((comment) => (
        <CommentItem key={comment.id} text={comment.text} />
      ))}
    </ul>}
    {!showComments &&  <h3>No comments added yet.</h3>}
    </>
  );
};

export default CommentsList;
