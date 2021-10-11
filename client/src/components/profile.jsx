import React,{useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router'
const axios = require('axios').default;
function Profile() {
  axios.defaults.withCredentials = true;
    const [textArea,setTextArea] = useState(1);
    const[first,setFirst] = useState("");
    const[last,setLast] = useState("");
    const[city,setCity] = useState("");
    const[bio,setBio] = useState("");
    const[img,setImg] = useState("");
    const[imgUrl,setImgUrl] = useState("");
    const history = useHistory();
    function textClick() {
        setTextArea(4);
    }
    function handleFirst(e) {
      let val = e.target.value;
      setFirst(val);
    }
    function handleLast(e) {
      let val = e.target.value;
      setLast(val);
    }
    function handleCity(e) {
      let val = e.target.value;
      setCity(val);
    }
    function handleBio(e) {
      let val = e.target.value;
      setBio(val);
    }
    function handleImg(e) {
      let val = e.target.files[0];
      let val1 = e.target.value;
      setImg(val1);
      const reader = new FileReader();
      console.log(val);
      reader.readAsDataURL(val);
      reader.onload = (e)=>{
        console.log(e.target.result);
        setImgUrl(e.target.result);
      }
        
  
      
    }
    function subImg() {

    }
    function handleClick() {
      let obj = {
        first: first,
        last: last,
        city: city,
        bio: bio,
        img:imgUrl
      }
      subImg();
      axios
      .post("/saveUser",obj,{headers: {'Access-Control-Allow-Origin': "http://localhost:3000"}})
      .then(res=>{
        if(res.data==="ok") {
          history.push("/feed")
        }
      })
      
    }
  return (
    <div className="profile">
      <h1>Profile Set Up</h1>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="First Name">
            <Form.Control style={{border:"1px solid #272727"}} className="shadow-none" onChange={handleFirst} value={first} type="text" placeholder="First Name" />
          </FloatingLabel>
        </Col>
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="Last Name">
            <Form.Control style={{border:"1px solid #272727"}} className="shadow-none" onChange={handleLast} value={last} type="text" placeholder="Last Name" />
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="g-2">
        <Col md>
          <FloatingLabel controlId="floatingInputGrid" label="City">
            <Form.Control style={{border:"1px solid #272727",marginTop:"15px"}} onChange={handleCity} value={city} className="shadow-none" type="text" placeholder="City" />
          </FloatingLabel>
        </Col>
      </Row>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control style={{border:"1px solid #272727"}} className="shadow-none" type="file" onChange={handleImg} value={img}/>
      </Form.Group>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control onClick={textClick} style={{border:"1px solid #272727"}} onChange={handleBio} value={bio} className="shadow-none" as="textarea" rows={textArea} />
        </Form.Group>
      </Form>
      <Button onClick={handleClick} style={{backgroundColor:"#4F98CA"}} variant="primary">Set Up Profile</Button>{' '}
    </div>
  );
}

export default Profile;
