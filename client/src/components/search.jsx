import React,{useState} from "react";
import Navbar from "./navbar.jsx";
import Result from "./result.jsx";
function Search(props) {
    const[data,setData] = useState([]);
    function getData(key) {
        setData(key);
    }
    console.log(props.display);
    function handleMap(element) {
        return <Result data={element}/>
    }
    return(
        <div>
            <Navbar search={props.search}/>
            {props.display.map(handleMap)}
        </div>
    );
}

export default Search;