const foodItemModel = require("../models/fooditem.model")
const storageService = require('../services/storage.service')
const { v4: uuid } = require('uuid')


const createFood = async (req,res)=>{
    // Point to be noted here: req.body will give the constraints - name, description
    // Que is where would be the file - So file would be in req.file
    // req.foodPartner a new object is made in the req object through the middlewa
    /*console.log(req.body)
    console.log(req.file)
    console.log(req.foodPartner)*/
    const { name, description} = req.body
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())
    const foodItem = await foodItemModel.create({
        name, description, video:fileUploadResult.url, foodPartner:req.foodPartner._id
    })
    res.status(201).json({
        message: "food-item created successfully",
        foodItem
    })
}
const getFoodItems = async (req,res)=>{
    const foodItems = await foodItemModel.find({})
    return res.status(201).json({
        message:"Food items fetched",
        foodItems
    })
}
module.exports = {createFood, getFoodItems}