import React,{useState,useEfffect, useEffect} from "react";
import Navbar from "./navbar.jsx";
import Content from "./content.jsx";
import ReactPaginate from 'react-paginate';
import { PromiseProvider } from "mongoose";
const axios = require('axios').default;
axios.defaults.withCredentials = true;
function Feed(props) {
    const[searchData,setSearchData] = useState([]);
    const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(2);
  const [pageCount, setPageCount] = useState(0)
  const[test,setTest] = useState(true);
  function Test(key) {
      setTest(key);
  }
    useEffect(()=>{
        axios.get("/posts")
        .then((res)=>{
            const data = res.data;
            
                const slice = data.slice(offset, offset + perPage)
                console.log(offset+"fhnfhjn");
                // const postData = slice.map(pd => <div key={pd.id}>
                //     <p>{pd.title}</p>
                //     <img src={pd.thumbnailUrl} alt=""/>
                // </div>)
                setData(slice)
                setPageCount(Math.ceil(data.length / perPage))
        })
    },[offset,test])
    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        if(selectedPage==0)
        setOffset(0)
        else {
            setOffset((selectedPage*2))
        }
        console.log(selectedPage+"asdfgh");
        
    };
    function getData(key) {
        setSearchData(key);
    }
return(
    <div>
        <Navbar search={props.search}/>
        <Content set={Test} com={props.com} data={data}/>
        <ReactPaginate
        
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    </div>
);
}

export default Feed;