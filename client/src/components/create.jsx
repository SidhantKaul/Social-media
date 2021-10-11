import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "./navbar.jsx";
import { useHistory } from "react-router";
const axios = require("axios").default;
function Create() {
  axios.defaults.withCredentials = true;
  const [textArea, setTextArea] = useState(1);
  const [bio, setBio] = useState("");
  const [icon, setIcon] = useState("");
  const[img,setImg] = useState("");
  const[imgUrl,setImgUrl] = useState("");
  const history = useHistory();
  function textClick() {
    setTextArea(4);
  }
  function handleBio(e) {
    let val = e.target.value;
    setBio(val);
  }
  function handleClick() {
    let obj = {
      post: bio,
      img: imgUrl,
    };
    axios.post("/create", obj).then((res) => {
      if (res.data) {
        setIcon(res.data);
        setBio("");
      }
    });
  }
  function handleImg(e) {
    let val = e.target.files[0];
    let val1 = e.target.value;
    const reader = new FileReader();
    console.log(val);
    setImg(val1);
    reader.readAsDataURL(val);
    reader.onload = (e)=>{
      console.log(e.target.result);
      setImgUrl(e.target.result);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="create">
        <h1>Create Post</h1>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Post Picture</Form.Label>
          <Form.Control
          onChange={handleImg}
            style={{ border: "1px solid #272727" }}
            className="shadow-none"
            value={img}
            type="file"
          />
        </Form.Group>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Post</Form.Label>
            <Form.Control
              onClick={textClick}
              style={{ border: "1px solid #272727" }}
              onChange={handleBio}
              value={bio}
              className="shadow-none"
              as="textarea"
              rows={textArea}
            />
          </Form.Group>
        </Form>
        {icon === "" && (
          <Button
            onClick={handleClick}
            style={{ backgroundColor: "#4F98CA" }}
            variant="primary"
          >
            Add post
          </Button>
        )}
        {icon === "ok" && (
          <Button
            onClick={handleClick}
            style={{ backgroundColor: "#4F98CA" }}
            variant="primary"
          >
            Successfully added
          </Button>
        )}
      </div>
    </div>
  );
}

export default Create;
