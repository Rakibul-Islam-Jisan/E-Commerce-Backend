const express = require('express')
const deleteUserC = require('../controllers/admin_Controllers/deleteUsersC')
const activeUsersC = require('../controllers/admin_Controllers/activeUsersC')
const deactiveUsersC = require('../controllers/admin_Controllers/deactiveUsersC')

const router = express.Router()



router.post('/deleteUser',deleteUserC)
router.post('/activeUser',activeUsersC)
router.post('/deactiveUser',deactiveUsersC)




module.exports = router