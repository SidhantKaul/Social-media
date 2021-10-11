import React,{useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router'
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function Navbar1(props) {
  const[name,setName] = useState("");
  const[searchData,setSearchData] = useState({});
  const history = useHistory();
  function handleProfile() {
    history.push("/myprofile");
  }
  function handleChange(e) {
    let val = e.target.value;
    setName(val);
  }
  function handleClick() {
    axios
    .get("/search/"+name)
    .then(async (res)=>{
      if(res) {
        setSearchData(res.data);
        await props.search(res.data);
      }
    })
    history.push("/search");
  }
  function handleCreate() {
    history.push("/create");
  }
  function handleHome() {
    history.push("/feed");
  }
  return (
      
      <div className="navbar">
          <Navbar style={{width:"100%"}} expand="lg">
      <Navbar.Brand href="/">FBGRAM</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="ms-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          <Nav.Link onClick={handleHome}><i style={{fontSize:"1.4rem"}} className="fas fa-home"></i></Nav.Link>
          <Nav.Link onClick={handleProfile} ><i style={{fontSize:"1.4rem"}} className="far fa-user-circle"></i></Nav.Link>
          <Nav.Link onClick={handleCreate} ><i style={{fontSize:"1.4rem"}} className="fas fa-plus-circle"></i></Nav.Link>
        </Nav>
        <Form className="d-flex ">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2 shadow-none"
            aria-label="Search"
            onChange={handleChange}
            value={name}
          />
          <Button onClick={handleClick} className="shadow-none" variant="outline-success"><i className="fas fa-search"></i></Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
      </div>
    
  );
}
export default Navbar1;
