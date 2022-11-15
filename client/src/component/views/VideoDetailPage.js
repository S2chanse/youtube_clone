import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { List, Avatar, Row, Col } from "antd";
import axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";
import Comment from "./Sections/Comment";

export default function VideoDetailPage() {
  let params = useParams();
  const [videoInfo, setVideoInfo] = useState({});
  useEffect(() => {
    console.log(params);
    findVideo();
  }, []);

  const findVideo = async () => {
    try {
      let res = await axios.post("/api/video/getVideoDetail", params);
      if (res.data.success) {
        console.log(res.data.video);
        setVideoInfo(res.data.video);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Row gutter={[16, 16]}>
      <Col lg={18} xs={24}>
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
          <video
            style={{ width: "100%" }}
            src={`http://localhost:5000/${videoInfo.filePath}`}
            alt="video"
            controls
          />
          <List.Item
            actions={
              params.writerId !== window.localStorage.getItem("userId")
                ? [<Subscribe userTo={params.writerId} />]
                : ""
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar src={videoInfo.writer && videoInfo.writer.image} />
              }
              title={<a href="https://ant.design">{videoInfo.title}</a>}
              description={videoInfo.description}
            />
          </List.Item>
          <Comment />
        </div>
      </Col>
      <Col lg={6} xs={24}>
        <SideVideo />
      </Col>
    </Row>
  );
}
