import { Button, Checkbox, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Dropzone, { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";
import Icon from "@ant-design/icons/lib/components/AntdIcon";

export default function VideoUploadPage() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h3>Video UPload Page</h3>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
            {/* Thumbnail */}
            <div>
              <img src alt="" />
            </div>
          </div>
          <br />
          <br />
          <label>Title</label>
          <Input />
          <br />
          <br />
          <label>Description</label>
          <TextArea />
          <br />
          <br />

          <select></select>
          <br />
          <br />

          <select></select>
          <br />
          <br />

          <Button>Submit</Button>
        </Form>
      </div>
    </div>
  );
}
