const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")

dotenv.config()
const port = process.env.PORT
app.use(cors())
app.use(express.json())
const auth = process.env.AUTH
const url = "mongodb+srv://" + auth + "@atlascluster.0iwigdk.mongodb.net/CVcontacts"
mongoose.connect(url)

const postSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  time: String
})

const Post = mongoose.model("Post", postSchema)


const authSchema = new mongoose.Schema({
  username: String,
  password: String,
})

const Auth = mongoose.model("Auth", authSchema)

// const user = new Auth({
//   username: "qiur12",
//   password: "731006",
// })
// user.save()

// app.get("/login",function(req,res){
//   authSchema.find(function(err,foundauth){

//   })
// })

// login page
app.post("/login", (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;
  Auth.findOne({ username: name }, function (err, foundUser) {
    if (foundUser) {
      if (password === foundUser.password) {
        res.send({ message: "login sucess", status: true, user: foundUser })
        // res.redirect(301, 'https://google.com')
      } else {
        res.send({ message: "wrong credentials", })
      }
    } else {
      res.send("not register")
    }
  })
});
// end

app.delete("/userdata/:id", (req, res) => {
  console.log(req.params.id)
  const requestDeleteId = req.params.id
  Post.deleteOne({ _id: requestDeleteId }, function (err) {
    if (!err) {
      res.send("Successfully Deleted")
    } else {
      res.send(err)
    }
  })

  // res.status(200).json({
  //   message: "Post deleted!"
  // })
})


app.get("/", function (req, res) {
  res.send("Hello world")
})

app.get("/userdata", function (req, res) {
  Post.find(function (err, foundArticles) {
    if (!err) {
      res.send(foundArticles)
    } else {
      res.send(err)
    }
  })
})

app.delete("/userdata", function (req, res) {
  Post.deleteMany(function (err) {
    if (!err) {
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
})

app.post("/information", function (req, res) {
  const body = req.body
  console.log(body);
  const post = new Post({
    name: body.name,
    email: body.email,
    message: body.message,
    time: body.date
  })
  post.save(function (err) {
  })
  // console.log(body)
  // res.json(body)
})

app.listen(parseInt(port), () => {
  console.log(`Example app listening on port ${parseInt(port)}`)
})