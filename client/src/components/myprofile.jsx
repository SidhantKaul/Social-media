import React,{useState,useEffect} from "react";
import img from "../sidhant.jpeg"
import Navbar from "./navbar";
import {Image} from 'cloudinary-react';
import Content from "./content";
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function Myprofile(props) {
    const[data,setData] = useState({});
    const[test,setTest] = useState(false);
    useEffect(()=>{
        axios
        .get("/myprofile")
        .then((res)=>{
            if(res.data)
            setData(res.data);
            console.log(res.data);
            setTest(true);
        })

    },[])
    return(
        <div className="myprofile">
            <Navbar search={props.search}/>
            <div className="Myprofile-img">
            <img  src={"https://res.cloudinary.com/dw3lbt8z4/image/upload/v1633431293/"+data.img+".png"} className="Myprofile-img-img" alt="f" />
            </div>
            <div className="Myprofile-details">
                <h3>{data.name}</h3>
                <p>{data.bio}</p>
                <p style={{color:"#FFE194"}}>{data.city}</p>
            </div>
            {test&&<Content com={props.com} data={data.arr}/>}
        </div>
    );
}
export default Myprofile;