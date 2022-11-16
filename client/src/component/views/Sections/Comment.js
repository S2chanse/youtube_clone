import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState } from 'react';

export default function Comment() {
  const [content, setContent] = useState('');
  const handleChange = (e) => {
    setContent(e.currentTarget.value);
  };
  const onSubmit = async (e) => {
    e.preventDeafult();
    window.localStorage.getItem('userId');
    if (
      window.localStorage.getItem('userId') === null ||
      window.localStorage.getItem('userId') === ''
    ) {
      alert('로그인 기능이 필요합니다.');
      return;
    }
    const params = {
      content,
    };
    try {
      let res = axios.post('/api/comment/saveComment', params);
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
      <form style={{ display: 'flex' }} onClick={onSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px', resize: 'none' }}
          onChange={handleChange}
          value={content}
          placeholder='write some comments'
        />
        <br />
        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
