import React from "react";
import img from "../sidhant.jpeg"
function Comment(props) {
    console.log(props.data);
    return(
        <div>
            {props.data.map((elem)=>{
                return(
                <div className="comment-div">
                <div className="comment-flex">
                    <div className="comment-flex-item">
                        <img className="comment-img" src={img} alt="" />
                    </div>
                    <div className="comment-flex-item">
                        <h3>{elem.username}</h3>
                    </div>
                </div>
                <div>
                    <p>{elem.comment}</p>
                </div>
                </div>
            );
            })}
        </div>
    );
}
export default Comment;