// create controllers for the user authentication

//Note : when a server is created via express the req.body can't read the data coming from the frontend at that time we use a middleware at the app.js to parse the data

const userModel = require('../models/user.model')
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async (req,res)=>{
    //we will get data from req.body so while registering we'll get
    const {fullName, email, password} = req.body
    // Next thing we need to check whether the email is already exist or not
    const userAlreadyExist = await userModel.findOne({email})
    if(userAlreadyExist){
        return res.status(400).json({
            message:"user already exists",
        })
    }
    //if the user doesn't exists then create a new user in the database
    // before creating the user hash the password.
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({fullName, email, password:hashPassword}) 
    // create a token and store the user details in the token

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)

    res.status(201).json({
        message: "user registered successfully!",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }    
    })
}

const loginUser = async (req,res)=>{
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    // We'll check whether the user exist in the database or not

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password!"
        })
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
        return res.status(400).json({
            message:"Invalid email or password!"
        })
    }

    const token = jwt.sign({id:user._id }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(200).json({
        message:"user logged in successfully!",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })
}

const logoutUser = async (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        message:"User loggedout successfully!"
    })
}



// Controllers for the food partner
const registerFoodPartner = async (req,res)=>{
    const {name, email, password} = req.body
    const userExists = await foodPartnerModel.findOne({email})
    if(userExists){
        return res.status(400).json({
            messsage:"food partner already exists!"
        })
    }
    const hashedPasswordFoodPartner = await bcrypt.hash(password, 10)
    const foodPartner = await foodPartnerModel.create({name, email, password:hashedPasswordFoodPartner})
    const token = jwt.sign({_id:foodPartner._id}, process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"food partner registered!",
        foodPartner:{
            _id:foodPartner._id,
            name:foodPartner.name,
            email:foodPartner.email
        }
    })
}

const loginFoodPartner = async (req,res)=>{
    const {email, password} = req.body
    const foodPartner = await foodPartnerModel.findOne({email})
    if(!foodPartner){
        return res.status(400).json({
            message:"Invalid email or password!"
        })
    }
    const passwordMatched = await bcrypt.compare(password, foodPartner.password)
    if(!passwordMatched){
        return res.status(400).json({
            message:"Invalid email or password!"
        })
    }

    const token = jwt.sign({_id:foodPartner._id},process.env.JWT_SECRET)
    res.cookie("token", token)
    return res.status(201).json({
        message:"User loggedin successfully!",
        foodPartner:{
            _id:foodPartner._id,
            email:foodPartner.email,
            name:foodPartner.name
        }
    })
}

const foodPartnerUserLogout = async (req,res)=>{
    res.clearCookie("token");
    res.status(201).json({
        message:"user loggedout successfully!",
    })
}

module.exports = {registerUser, loginUser, logoutUser, registerFoodPartner, loginFoodPartner, foodPartnerUserLogout}