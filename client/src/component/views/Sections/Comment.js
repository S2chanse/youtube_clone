import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import SingleComment from './SingleComment';

export default function Comment({ commentsList, refreshFunction }) {
  const [content, setContent] = useState('');
  const user = useSelector((state) => state.user);
  let queryString = useParams();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (user._id === null) {
      alert('로그인 기능이 필요합니다.');
      return;
    }
    const params = {
      content,
      writer: user._id,
      postId: queryString.videoId,
    };
    try {
      let res = await axios.post('/api/comment/saveComment', params);

      refreshFunction(res.data.result);
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />
      {/* Comment Lists  */}

      {commentsList.map((comment, index) => {
        return (
          !comment.responseTo && (
            <SingleComment
              comment={comment}
              key={index}
              refreshFunction={refreshFunction}
            />
          )
        );
      })}
      {/* {console.log(props.CommentLists)}

            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))} */}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px', resize: 'none' }}
          onChange={(e) => setContent(e.currentTarget.value)}
          value={content}
          placeholder='write some comments'
        />
        <br />
        <Button
          style={{ width: '20%', height: '52px' }}
          onClick={(e) => onSubmit(e)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
