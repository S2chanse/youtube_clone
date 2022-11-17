import { Avatar, Button, Comment, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import SingleComment from './SingleComment';

export default function ReplyComment({
  commentsList,
  parentCommentId,
  refreshFunction,
}) {
  const user = useSelector((state) => state.user);
  const [replyFlag, setReplyFlag] = useState(false);
  const [replyCnt, setReplyCnt] = useState(0);
  let childCnt = 0;
  useEffect(() => {
    commentsList.map((replyComment) => {
      if (parentCommentId === replyComment.responseTo) {
        childCnt++;
        setReplyCnt(childCnt);
      }
      console.log(parentCommentId, parentCommentId === replyComment.responseTo);
    });
  }, []);

  let renderReplyComment = () =>
    commentsList.map((comment) => (
      <React.Fragment>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment
              comment={comment}
              refreshFunction={refreshFunction}
            />
            <ReplyComment
              commentsList={commentsList}
              parentCommentId={comment._id}
              refreshFunction={refreshFunction}
            />
          </div>
        )}
      </React.Fragment>
    ));
  return (
    <div>
      {replyCnt > 0 && (
        <>
          <p
            style={{ fontSize: '14px', margin: 0, color: 'grey' }}
            onClick={(e) => setReplyFlag(!replyFlag)}
          >
            View {replyCnt} more comment(s)
          </p>
          {replyFlag && renderReplyComment()}
        </>
      )}
    </div>
  );
}
