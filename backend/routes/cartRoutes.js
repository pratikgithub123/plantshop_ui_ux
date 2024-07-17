const router = require("express").Router()
const cartController = require("../controllers/cartController")

router.post("/add", cartController.addToCart )
router.get("/getcart/:userId", cartController.getCart )

module.exports = router;