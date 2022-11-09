import TextArea from "antd/lib/input/TextArea";
import Dropzone, { useDropzone } from "react-dropzone";
import React, { useState, useCallback, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Input } from "antd";
import axios from "axios";

export default function VideoUploadPage() {
  const Private = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];

  const Catogories = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" },
    { value: 4, label: "Sports" },
  ];

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  /**
   * Private  : 0 else 1
   */
  const [Privacy, setPrivacy] = useState(0);
  const [Category, setCategory] = useState(0);

  const onDrop = (files) => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);

    axios.post("/api/video/upload", formData, config).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        let variable = {
          url: res.data.filePath,
          fileName: res.data.fileName,
        };
        axios.post("/api/video/thumbnail", variable).then((response) => {
          if (response.data.success) {
            console.log(response.data);
          } else {
            alert("썸네일 에러 발생");
          }
        });
      } else {
        alert("비디오 업로드 실패");
      }
    });
  };

  useEffect(() => {
    console.log(`Title : ${Title},Privacy:${Privacy},Category:${Category}`);
  }, [Title, Category, Privacy]);

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
            <div>{/* <img src='' alt='' /> */}</div>
          </div>
          <br />
          <br />
          <label>Title</label>
          <Input
            value={Title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
          <br />
          <br />
          <label>Description</label>
          <TextArea
            value={Description}
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

          <Button type="primary" size="large">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
