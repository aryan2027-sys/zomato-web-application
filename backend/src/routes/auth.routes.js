// create all the authentication routes

const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()

/*Create a route
router.post('/register',controller)*/
// basically controller is a callback but while creating routes we call it as a controller and a seperate dedicated folder is created for the controller.


//User auth APIs
router.post("/user/register",authController.registerUser)
router.post("/user/login", authController.loginUser)
router.get("/user/logout",authController.logoutUser)

//Food partner auth APIs 
router.post("/food-partner/register",authController.registerFoodPartner)
router.post("/food-partner/login", authController.loginFoodPartner)
router.get("/food-partner/logout",authController.foodPartnerUserLogout)

module.exports = router