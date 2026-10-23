const express = require('express')
const router = express.Router()
const createCategoryC = require('../controllers/user_Controllers/createCategoryC')
const allCategoryShow = require('../controllers/user_Controllers/allCategoryShow')


router.post('/createCategory',createCategoryC)
router.post('/allCategory',allCategoryShow)


module.exports = router