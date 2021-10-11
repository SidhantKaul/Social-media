import React,{useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./profile.jsx";
import Feed from "./feed.jsx";
import Search from "./search.jsx";
import Myprofile from "./myprofile";
import Login from "./login.jsx";
import Create from "./create.jsx"
import Comment from "./comments.jsx"
function App() {
  const[data,setData] = useState({});
  const[searchData,setSearchdata] = useState([]);
  function setSearch(key) {
    console.log(key);
    setSearchdata(key);
  }
  function setComment(key) {
    setData(key);
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/feed">
            <Feed search={setSearch} com={setComment}/>
          </Route>
          <Route exact path="/search">
            <Search search={setSearch} display={searchData}/>
          </Route>
          <Route exact path="/myprofile">
            <Myprofile search={setSearch} com={setComment}/>
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/create">
            <Create />
          </Route>
          <Route exact path="/comment">
            <Comment data={data}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
