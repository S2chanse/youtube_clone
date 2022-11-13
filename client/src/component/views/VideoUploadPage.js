import TextArea from "antd/lib/input/TextArea";
import Dropzone, { useDropzone } from "react-dropzone";
import React, { useState, useCallback, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Input } from "antd";
import { useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

export default function VideoUploadPage() {
  const Private = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];
  const user = useSelector((state) => state.user);
  const Catogories = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [duration, setDuration] = useState("");
  const [filePath, setFilePath] = useState("");
  /**
   * Private  : 0 else 1
   */
  const [privacy, setPrivacy] = useState(0);
  const [category, setCategory] = useState(0);

  const navigator = useNavigate();
  const onDrop = (files) => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios
      .post("/api/video/upload", formData, config)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          let body = {
            url: res.data.filePath,
            fileName: res.data.fileName,
          };
          setFilePath(res.data.filePath);
          axios.post("/api/video/thumbnail", body).then((response) => {
            if (response.data.success) {
              alert("비디오 업로드");
              console.log(response.data);
              setThumbnail(response.data.thumbsFilePath);
              setDuration(response.data.fileDuration);
            } else {
              alert("썸네일 에러 발생");
            }
          });
        } else {
          alert("비디오 업로드 실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    let videoBody = {
      title,
      description,
      privacy,
      filePath,
      category,
      duration,
      thumbnail,
      writer: user.loginSucces.userId,
    };
    let emptyCheck = false;
    Object.entries(videoBody).forEach(([key, value]) => {
      if (!emptyCheck && !value && (key !== "privacy" || key !== "category")) {
        emptyCheck = true;
        alert(`${key} 정보를 채워 주세요.`);
      }
    });
    if (emptyCheck) {
      return;
    }
    axios
      .post("/api/video/infoUpload", videoBody)
      .then((res) => {
        if (res.data.success) {
          alert("정보저장에 성공했습니다.");
          navigator("/");
        }
      })
      .catch((err) => {
        alert("동영상 정보 저장에 실패했습니다.");
        console.err(err);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h3>Video UPload Page</h3>
        <Form name="basic">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {/**
             * multiple : 파일 여러개? 여러개 : 단일
             */}
            <Dropzone onDrop={onDrop} multiple={false} maxSize={100000000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <FiPlus type="plus" style={{ fontSize: "3rem" }} />
                </div>
              )}
            </Dropzone>
            {/* Thumbnail */}
            {thumbnail && (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`http://localhost:5000/${thumbnail}`}
                  alt="thumbnail"
                />
              </div>
            )}
          </div>
          <br />
          <br />
          <label>Title</label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <br />
          <br />
          <label>Description</label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
          <br />
          <br />

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setPrivacy(e.currentTarget.value);
            }}
          >
            {Private.map((item, index) => {
              return (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              );
            })}
          </Form.Select>
          <br />
          <br />

          <Form.Select
            aria-label="Default select example"
            onChange={(e) => {
              setCategory(e.currentTarget.value);
            }}
          >
            {Catogories.map((category, index) => {
              return (
                <option value={category.value} key={index}>
                  {category.label}
                </option>
              );
            })}
          </Form.Select>
          <br />
          <br />

          <Button type="primary" size="large" onClick={(e) => onSubmit(e)}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
