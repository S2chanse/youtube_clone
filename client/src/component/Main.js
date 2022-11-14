import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { Card, Col, Typography, Row } from "antd";
import Avatar from "react-avatar";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
const { Title } = Typography;
const { Meta } = Card;

export default function Main() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideos").then((res) => {
      console.log(res.data);
      if (res.data.success) {
        setVideos(res.data.videos);
      } else {
        console.error("Video 가져오기를 실패했습니다.");
      }
    });
  }, []);
  const renderCards = videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <div style={{ position: "relative" }}>
          <Link to={`/video/detail/${video._id}/${video.writer._id}`}>
            <img
              style={{ width: "100%" }}
              alt="thumbnail"
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div
              className=" duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </Link>
        </div>
        <br />
        <Meta title={video.title} />
        <span>
          <Avatar
            size="30"
            style={{ marginRight: "10px" }}
            round={true}
            src={video.writer.image}
          />
          {video.writer.name}
        </span>
        <br />
        <span style={{ marginLeft: "3rem" }}> {video.views}</span>-{" "}
        <span> {moment(video.createdAt).format("MMM Do YY")} </span>
      </Col>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title level={2}> Recommended </Title>
      <hr />
      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}
