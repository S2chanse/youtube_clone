import { Avatar, Button, Comment, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export default function SingleComment({ comment, refreshFunction }) {
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState('');
  const [repleFlag, setRepleFlag] = useState(false);
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
      comment: comment.postId,
      responseTo: comment.writer._id,
    };
    try {
      let res = await axios.post('/api/comment/saveComment', params);
      refreshFunction(res.data.result);
      setContent('');
    } catch (error) {
      console.log(error);
    }
  };
  const onClickReply = (e) => {
    e.preventDefault();
    setRepleFlag(!repleFlag);
  };
  const actions = [
    <span
      onClick={(e) => {
        onClickReply(e);
      }}
      key='comment-basic-reply-to'
    >
      댓글
    </span>,
  ];
  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} size={30} />}
        content={comment.content}
      />
      {repleFlag && (
        <form style={{ display: 'flex' }}>
          <TextArea
            style={{ width: '100%', borderRadius: '5px', resize: 'none' }}
            onChange={(e) => setContent(e.currentTarget.value)}
            value={content}
            placeholder='댓글 달기'
          />
          <br />
          <Button
            style={{ width: '20%', height: '52px' }}
            onClick={(e) => onSubmit(e)}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}
