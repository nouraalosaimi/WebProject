const express = require('express')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const  userModel = require('./models/userModel')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
require('dotenv').config()
const path = require('path')
const port = process.env.PORT || 5000;

app.use('/' , express.static(__dirname + '/public'))



 mongoose.connect("mongodb+srv://faadous:webproject@fatimah.7aiflij.mongodb.net/?retryWrites=true&w=majority").then(res=>console.log('atlass db connecteed')).catch(err => console.log(err))


 
 app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))


app.use(bodyParser.urlencoded({ extended: false }))
app.set("view engine" , "ejs")
app.use(cookieParser())


const checkUser = async(req ,res , next) =>{
  const userId = req.cookies.userId
  console.log(userId)
  if(userId){
    const user = await userModel.findById(userId)
    return res.render('HomePage' , { user : user})
  }
  next()
}





//route  for homeage
app.get("/" , checkUser,async(req ,res) =>{
  console.log(req.cookies)
  res.render('HomePage' , {user: null})
})



//route for login page
app.get("/login"  ,  async(req ,res) =>{
 res.render('LoginPage' , {err : null})
})


//route for community page

app.get("/community"  ,  async(req ,res) =>{
  res.render('CommunityPage')
  // res.send('CommunityPage')
  // res.render('LoginPage' , {err : null})
 })


 //route for contact us page
app.get("/contact"  ,  async(req ,res) =>{
  res.render('ContactUsPage')
 })


//route for signup page
app.get("/register"  ,  async(req ,res) =>{
  res.render('SignupPage' , {err : null})
 })
 
 //route for matches page
app.get("/matches"  ,  async(req ,res) =>{
  res.render('MatchesPage' , {err : null})
 })

 //route for competition page
 app.get("/competition"  ,  async(req ,res) =>{
  res.render('CompetitionsPage' , {err : null})
 })

  //route for leaderboard page
  app.get("/leaderboard"  ,  async(req ,res) =>{
    res.render('Leader' , {err : null})
   })

  //route for basketball page
 app.get("/basket"  ,  async(req ,res) =>{
  res.render('BasketballPage' , {err : null})
 })

  //route for football page
  app.get("/foot"  ,  async(req ,res) =>{
    res.render('FootballPage' , {err : null})
   })

  //route for swimmingball page
  app.get("/swim"  ,  async(req ,res) =>{
    res.render('SwimmingPage' , {err : null})
   })

 //route for tennis page
 app.get("/tennis"  ,  async(req ,res) =>{
  res.render('TennisPage' , {err : null})
 })




// here nodejs server will recive name email and password from user and we are storing this data into mongodb
app.post("/register" , async(req ,res) =>{
  const {name , email , password} = req.body
  console.log(req.body)
  const hashPassword = await bcrypt.hash(password , 10)
  const data  = new userModel({
    name,
    email ,
    password : hashPassword
  })

  if(name === ""  || email === "" ){
    console.log('all fields are required')
    return res.render("SignupPage" , {err : "All Fields are required !"})
  }
  try {
  //if user already registered it will show an error message (user already registred)  
    const findUser = await userModel.findOne({email : email})
    if(findUser){
      console.log('user already')
      return res.render("SignupPage" , {err : "Email Already Registered !"})

    }
    const newUser =  await data.save()
    res.redirect("/login")
  } catch (error) {
    console.log(error)
    return res.render("SignupPage" , {err : "Unexpected Error , Please try again latter!"})
  }

})



//here we get email and passwrod from user and match that email and password with our database if user is valid or not 
app.post('/login', async(req , res , done)=>{
const {email , password} = req.body
const user = await userModel.findOne({email})

//is email is not found in mongodb it will show an error ('no user found ')
if (!user) { return res.render("LoginPage" , {err : "No User Found"})}

//is user puts wrong credintials it will show an error ('wrong creds ')
if (! await bcrypt.compare(password ,user.password)) { return res.render("LoginPage" , {err : "Wrong Credintials"})}
res.cookie('userId'  , user._id)
res.render('HomePage' , {user: user})
});








app.listen(port , ()=>{
    console.log(`server is running on port ${port} , http://localhost:${port}`)
})
