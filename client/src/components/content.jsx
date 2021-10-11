import React,{useState} from "react";
import img from "../sidhant.jpeg";
import { useHistory } from 'react-router';
import Button from "react-bootstrap/Button";
const axios = require('axios').default;
axios.defaults.withCredentials = true;

function Content(props) {
  const[like,setLike] = useState(0);
  const[id,setId] = useState("");
  const[test,setTest] = useState(false);
  const history = useHistory();
  console.log(props);
  return (
    <div>
      {props.data.map((elem) => {
        return (
          <div>
            {/* {elem.arr1.map((elem1) => { */}
              {/* return ( */}
                <div className="content">
            <div className="content-name">
              <h2>{elem.name}</h2>
            </div>
                  <div className="txt">
                    <p>{elem.text}</p>
                  </div>
                  <div className="img">
                    {elem.img!==""&&<img className="content-img" src={"https://res.cloudinary.com/dw3lbt8z4/image/upload/v1633431293/"+elem.img+".png"} alt="" />}
                  </div>
                  <div className="reaction">
                    <Button style={{backgroundColor:"#E8F6EF",color:"#4C4C6D",border:"none",margin:"5px"}} variant="primary" onClick={()=>{
                      axios
                      .get("/like/"+elem._id+"@"+elem.id)
                      .then((res)=>{
                        // console.log(res);
                        // console.log(res.data);
                        // setTest(true);
                        // setLike(res.data);
                        // setId(elem._id);
                        if(like===0) {
                          props.set(false);
                          setLike(1);
                        }
                        
                        else {
                          props.set(true);
                          setLike(0);
                        }
                        
                      })
                    }}>
                      <i
                        style={{ fontSize: "1.4rem" }}
                        className="far fa-heart"
                      ></i> <br />
                      {/* {test===true?<p>{like}</p>:<p>{elem.like.length}</p>} */}
                      <p>{elem.like.length}</p>
                    </Button>
                    <Button style={{backgroundColor:"#E8F6EF",color:"#4C4C6D",border:"none",margin:"5px"}} variant="primary" onClick={()=>{
                      let obj = {
                        userId: elem.id,
                        postId: elem._id
                      }
                      props.com(obj)
                      history.push("/comment")
                    }}>
                      <i
                        style={{ fontSize: "1.4rem" }}
                        className="far fa-comment"
                      ></i>
                      <br />
                      <p>{elem.comments.length}</p>
                    </Button>
                  </div>
                </div>
              {/* ); */}
            {/* })} */}
          </div>
        );
      })}
    </div>
  );
}

export default Content;
