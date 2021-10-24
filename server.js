require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const cloudinary = require("cloudinary").v2;
const path = require("path");
let port = process.env.PORT;
let id = 0;
let qid = 0;
let pawd = process.env.PAWD;
console.log(pawd);
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "/client/build")));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin: http://localhost:3000");
//   next();
// });
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SEC,
});
mongoose.connect("mongodb+srv://user_me:"+process.env.PAWD+"@cluster0.vbpam.mongodb.net/socialDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const likeSchema = new mongoose.Schema({
  id: String,
});
const commentSchema = new mongoose.Schema({
  username: String,
  userid: String,
  comment: String,
  img: String,
});
const postSchema = new mongoose.Schema({
  text: String,
  img: String,
  likes: Number,
  like: [String],
  timeStamp: Number,
  comments: [commentSchema],
  name: String,
  id: String,
});
const friendSchema = new mongoose.Schema({
  name: String,
  img: String,
  id: String,
});
const userSchema = new mongoose.Schema({
  friends: [friendSchema],
  firstName: String,
  id: String,
  name: String,
  lastName: String,
  bio: String,
  city: String,
  img: String,
  post: [postSchema],
});
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);
const Friend = new mongoose.model("Friend", friendSchema);
const Post = new mongoose.model("Post", postSchema);
const Comment = new mongoose.model("Comment", commentSchema);
function removeAllInstances(arr, item) {
  for (var i = arr.length; i--; ) {
    if (arr[i] === item) arr.splice(i, 1);
  }
}
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  User.findById(_id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "350793599005-0v0fmo1muo1n0ci3f8fe9195t1gqh5ju.apps.googleusercontent.com",
      clientSecret: "r-MAnh5k6pQQZkQuprm0Khuy",
      callbackURL: "https://guarded-journey-24561.herokuapp.com/auth/google/social",
      // callbackURL:"http://localhost:9000/auth/google/social",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },

    function (accessToken, refreshToken, profile, cb) {
      id = profile;
      // console.log(id);
      User.find({ id: profile.id }, function (err, result) {
        if (err) console.log(err);
        else {
          if (result.length === 0) qid = 0;
          else qid = 1;
        }
      });
      User.findOrCreate({ id: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

app.post("/saveUser", async function (req, res) {
  try {
    console.log("here1");
    console.log(req.user);
    let uploadRes = {
      public_id: ""
    }
    if(req.body.img)
     uploadRes = await cloudinary.uploader.upload(req.body.img);
    console.log(uploadRes);
    User.findOneAndUpdate(
      { id: req.user.id },
      {
        firstName: req.body.first,
        lastName: req.body.last,
        city: req.body.city,
        bio: req.body.bio,
        img: uploadRes.public_id
      },
      async function (err, result) {
        if (err) console.log(err);
        else {
          id = 1;
          console.log("grtetetete");
          res.send("ok");
        }
      }
    );
  } catch (e) {
    console.log(e);
  }
});
app.post("/addcomments/:id", function (req, res) {
  let userId = req.params.id.split("@")[0];
  let postId = req.params.id.split("@")[1];
  console.log(userId + " " + postId);
  let im = "";
  
  User.findOne({ id: userId }, function (err, result) {
    if (err) console.log(err);
    else {
      result.post.map((elem) => {
        if (elem._id.toString() === postId) {
          console.log(result.img);
          User.findOne({id:req.user.id},function(err,result1) {
            if(err)
            console.log(err);
            else {
              const comment = new Comment({
                username: req.user.firstName + " " + req.user.lastName,
                userid: userId,
                comment: req.body.text,
                img: result1.img
              });
              elem.comments.push(comment);
              console.log(comment);
              result.save((err) => {
                if (!err) res.send("OK");
              });
            }
          })
        }
      });
    }
  });
});
app.post("/create", async function (req, res) {
  try {
    let date = "" + Date.now();
    let uploadRes = {
      public_id: ""
    }
    if(req.body.img)
  uploadRes = await cloudinary.uploader.upload(req.body.img);

  let post = new Post({
    text: req.body.post,
    img: uploadRes.public_id,
    timeStamp: date,
    likes: 0,
    like: [],
    id: req.user.id,
    name: "",
  });
  User.findOne({ id: req.user.id }, function (err, result) {
    if (err) console.log(err);
    else {
      post.name = result.firstName + " " + result.lastName;
      result.post.push(post);
      result.save((err)=>{
        if(!err)
        res.send("ok");
      });
    }
  });
  }
  catch(e) {
    console.log("the error is:"+e);
  }
  
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/social",
  passport.authenticate("google"),
  function (req, res) {
    // Successful authentication, redirect to secrets.
    console.log(req.user);
    if (qid === 1) res.redirect("/feed");
    else res.redirect("/profile");
  }
);
app.get("/myprofile", function (req, res) {
  console.log(":fd");
  User.findOne({ id: req.user.id }, function (err, result) {
    if (err) console.log(err);
    else {
      let obj = {
        name: result.firstName + " " + result.lastName,
        bio: result.bio,
        city: result.city,
        img: result.img,
        arr: [...result.post],
      };
      console.log("!@#$$");
      console.log(obj.arr);
      res.send(obj);
    }
  });
});
app.get("/posts", function (req, res) {
  let arr = [];
  let count = 0;
  console.log(req.user.id + "posts");
  User.findOne({ id: req.user.id }, async function (err, result) {
    if (err) console.log(err);
    else {
      console.log("-------");
      arr.push(...result.post);
      // console.log(result);
      if(result.friends.length==0)
      res.send(arr);
      else {
        result.friends.forEach(async (elem) => {
          await User.findOne({ id: elem.id }, function (err1, result1) {
            if (err1) console.log(err1);
            else {
              console.log(",.,.,.,,.," + []);
              // console.log(result1);
              count++;
              arr.push(...result1.post);
              if (count === result.friends.length) {
                console.log("|||||||");
                // console.log(arr);
                arr.sort((a, b) => {
                  return a.timeStamp - b.timeStamp;
                });
                arr = arr.reverse();
                res.send(arr);
              }
            }
          });
        });
      }
      
    }
  });
});
app.get("/search/:name", function (req, res) {
  let arr = req.params.name.split(" ");
  let firstName = arr[0];
  let lastName = arr[1];
  User.find(
    { firstName: firstName, lastName: lastName },
    function (err, result) {
      if (err) console.log(err);
      else {
        console.log(result);
        res.send(result);
      }
    }
  );
});
app.get("/like/:id", function (req, res) {
  let userId = req.params.id.split("@")[1];
  let postId = req.params.id.split("@")[0];
  let user_id = "";
  User.findOne({ id: req.user.id }, function (err, result) {
    if (err) console.log(err);
    else {
      user_id = result._id;
      User.findOne({ id: userId }, async function (err, result1) {
        if (err) console.log(err);
        else {
          console.log("difugwuidcg");

          result1.post.map(async (elem) => {
            console.log(elem);
            if (postId === elem._id.toString()) {
              console.log("dfdfdf");
              console.log(userId);
              if(elem.like.includes(req.user.id)) {
               
                elem.like = await elem.like.filter((ele)=>{
                  return ele!==req.user.id;
                })
                elem.likes--;
              }
              else {
                console.log("inside add");
                elem.like.push(req.user.id);
                elem.likes++;
              }
              console.log(elem);
              await result1.save();
              res.send(""+elem.like.length);
            }
          });
        }
      });
    }
  });
  console.log("weifsdfgbwe" + user_id);
  console.log(userId + "  " + postId);
});
app.get("/comments/:id", function (req, res) {
  let userId = req.params.id.split("@")[0];
  let postId = req.params.id.split("@")[1];
  console.log(userId + " " + postId);
  User.findOne({ id: userId }, function (err, result) {
    if (err) console.log(err);
    else {
      result.post.map((elem) => {
        if (elem._id.toString() === postId) {
          console.log(elem.comments);
          res.send(elem.comments);
        }
      });
    }
  });
});
app.get("/addfriend/:id", async function (req, res) {
  let id = req.params.id;
  let friend = new Friend();
  let addId = req.user.id;
  let test = true;
  console.log(req.user.id);
  console.log(id + "qwertyuiop");
  User.findOne({ id: id },  function (err, result) {
    if (err) console.log(err);
    else {
      friend = new Friend({
        id: id,
        name: result.firstName + " " + result.lastName,
      });
      
      if(test) {
        User.findOne({ id: addId }, async function (err, result1) {
          if (err) console.log(err);
          else {
            console.log(result1);
            console.log("hfhfhf");
            await result1.friends.map((elem)=>{
              if(elem.id===id) {
                test = false;
              }
              
            })
            if(test) {
              result1.friends.push(friend);
              result1.save();
            }
           
          }
        });
      }
      
    }
  });
});
// app.listen(9000, function () {
//   console.log("server started");
// });
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

if (port == null || port == "") {
port = 9000;
}
app.listen(port,function() {
console.log("Server has Started");
});