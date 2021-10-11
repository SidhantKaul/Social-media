import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Comments from "./comment.jsx";
import { useHistory } from "react-router";
const axios = require("axios").default;
axios.defaults.withCredentials = true;

function Comment(props) {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    axios
      .get(
        "/comments/" +
          props.data.userId +
          "@" +
          props.data.postId
      )
      .then((res) => {
        setData(res.data);
      });
  }, [comment]);
  function sendCom(key) {
    let obj = {
      text: comment,
    };

    axios
      .post(
        "/addcomments/" +
          props.data.userId +
          "@" +
          props.data.postId,
        obj
      )
      .then((res) => {
        
          console.log(res.data);
          setComment("");
        
      });
  }
  function onChange(e) {
    let val = e.target.value;
    setComment(val);
  }
  console.log(comment);
  return (
    <div className="comment">
      <h1>Comments</h1>
      <Form>
        <Form.Group
          className="mb-3 shadow-none"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Control
            className="shadow-none"
            onChange={onChange}
            value={comment}
            as="textarea"
            rows={3}
          />
        </Form.Group>
      </Form>
      <Button onClick={sendCom} className="shadow-none" variant="primary">
        add comment
      </Button>
      <div className="comments-comment">
        <Comments data={data} />
      </div>
    </div>
  );
}

export default Comment;
