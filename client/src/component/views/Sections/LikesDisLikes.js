import { Tooltip } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
  AiOutlineDislike,
} from 'react-icons/ai'; //AiOutlineLike
import { useSelector } from 'react-redux';
export default function LikesDisLikes({ videoId, commentId }) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(false);
  const [disLikeAction, setDisLikeAction] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    let variable = {};
    variable.userId = user._id;
    if (videoId) {
      variable.videoId = videoId;
    } else {
      variable.commentId = commentId;
    }
    axios.post('/api/like/getLikes', variable).then((res) => {
      if (res.data.success) {
        //얼마나 많은 좋아야를 받았는가?
        setLikes(res.data.results.length);
        //내가 이미 좋아요를 눌렀는가?
        res.data.results.map((like) => {
          if (like.userId === user._id) {
            setLikeAction(true);
          }
        });
      }
    });

    axios.post('/api/like/getDisLikes', variable).then((res) => {
      if (res.data.success) {
        //얼마나 많은 좋아야를 받았는가?
        setLikes(res.data.results.length);
        //내가 이미 좋아요를 눌렀는가?
        res.data.results.map((like) => {
          if (like.userId === user._id) {
            setDisLikeAction(true);
          }
        });
      }
    });
  }, []);

  return (
    <div>
      <span
        key='comment-basic-like'
        onClick={(e) => {
          setLikeAction(!likeAction);
        }}
      >
        <Tooltip title='Like'>
          {likeAction ? <AiFillLike /> : <AiOutlineLike />}
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span
        key='comment-basic-dislike'
        onClick={(e) => {
          setDisLikeAction(!disLikeAction);
        }}
      >
        <Tooltip title='Dislike'>
          {disLikeAction ? <AiFillDislike /> : <AiOutlineDislike />}
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
      </span>
    </div>
  );
}
