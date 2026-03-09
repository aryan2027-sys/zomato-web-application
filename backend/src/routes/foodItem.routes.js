const express = require("express")
const router = express.Router()
const foodItemController = require("../controllers/foodItem.controller")
const authMiddleware = require("../middleware/auth.middleware")
/* POST /api/food-item/ {protected} - this is protected because the food-item should be created by a food partner only */
/* That's why it should be protected and should be accessible to the foodpartner - to achieve it a middleware should be created */
/*As the file in a raw format is not readable by express - so to make it readable we use the package multer. */
const multer = require('multer')

const upload = multer({
    storage:multer.memoryStorage()
})
// make sure to add another method - upload.single("") - with a parameter in string format of the key that has been sent from the front end for the video.

/* Post /api/food  {protected} */
router.post("/",authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodItemController.createFood)

/*Get /api/food {protected} - this api is to get all the fooditems and it's for the normal user */
router.get("/", authMiddleware.authUserMiddleware, foodItemController.getFoodItems)



module.exports = router