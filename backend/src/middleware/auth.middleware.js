const foodPartnerModel = require("../models/foodpartner.model")
const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken")

const authFoodPartnerMiddleware = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Unauthorised access!"
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded._id)
        if(!foodPartner)[
            res.status(401).json({
                message:"Unauthorized access"
            })
        ]
        req.foodPartner = foodPartner
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token!"
        })
        
    }
}

const authUserMiddleware = async (req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        res.status(401).json({
            message: "Unauthorized access"
        })
    }
    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id)
        req.user = user
        next()
    }
    catch(error){
        return res.status(401).json({
            message:"Invalid token!"
        })
    }
}

module.exports = {authFoodPartnerMiddleware, authUserMiddleware}