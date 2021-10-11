import React from "react";
import { from } from "responselike";
import img from "../sidhant.jpeg";
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function Result(props) {
return(
    <div className="result">
        <div className="flex-item result-photo">
            <img className="result-img" src={"https://res.cloudinary.com/dw3lbt8z4/image/upload/v1633431293/"+props.data.img+".png"} alt="" />
        </div>
        <div className="flex-item result-details">
            <h3>{props.data.firstName+" "+props.data.lastName}</h3>
            <p>{props.data.city}</p>
        </div>
        <div className="flex-item result-add">
            <button style={{backgroundColor:"#FFE194",color:"#4C4C6D",border:"none",margin:"5px"}} onClick={()=>{
                axios
                .get("/addfriend/"+props.data.id)
            }}><i  style={{fontSize:"1.4rem"}} className="fas fa-plus"></i></button>
        </div>
    </div>
);
}

export default Result;