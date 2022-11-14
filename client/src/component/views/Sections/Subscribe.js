import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Subscribe({ userTo }) {
  const [subscribeCnt, setSubscribeCnt] = useState(0);
  const [subscribeYN, setSubscribeYN] = useState(false);

  const SubscribeBtn = styled.button`
    background-color: ${subscribeYN ? `grey` : `#cc0000`};
    border-radius: 4px;
    border: 1px solid #cc0000;
    color: white;
    padding: 10px 16px;
    font-weight: 500;
    font-size: 1rem;
    text-transform: uppsercase;
    &:hover {
      border: 1px solid white;
    }
  `;

  useEffect(() => {
    console.log(userTo);

    axios.post("/api/subscribe/subscribeNumber", { userTo }).then((res) => {
      if (res.data.success) {
        setSubscribeCnt(Number(res.data.subscribeCnt));
      } else {
        alert("구독자 수를 가져오지 못 했습니다.");
      }
    });
    axios
      .post("/api/subscribe/subscribed", {
        userTo,
        userFrom: window.localStorage.getItem("userId"),
      })
      .then((res) => {
        if (res.data.success) {
          setSubscribeYN(res.data.subscribeYN);
        } else {
          alert("구독자 수를 가져오지 못 했습니다.");
        }
      });
  }, []);

  const onSubscribe = async (e) => {
    e.preventDefault();
    let subscribeParams = {
      userTo,
      userFrom: window.localStorage.getItem("userId"),
    };
    let res;
    try {
      if (subscribeYN) {
        res = await axios.post("/api/subscribe/unSubscribe", subscribeParams);
        console.log(res);
        if (res.data.success) {
          alert("구독을 해제했습니다.");
          window.location.reload();
        }
      } else {
        res = await axios.post("/api/subscribe/subscribe", subscribeParams);
        console.log(res);
        if (res.data.success) {
          alert("구독을 했습니다.");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <SubscribeBtn onClick={(e) => onSubscribe(e)}>
        {subscribeCnt} {subscribeYN ? "Subscribed" : "Subscribe"}
      </SubscribeBtn>
    </div>
  );
}
