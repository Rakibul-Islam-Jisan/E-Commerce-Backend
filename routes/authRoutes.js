const express = require('express')
const router = express.Router()
const registration = require('../controllers/authentication_Controllers/registrationC')
const login = require('../controllers/authentication_Controllers/loginC')
const verifyC = require('../controllers/authentication_Controllers/verifyC')
const forgetPassC = require('../controllers/authentication_Controllers/forgetPassC')

router.post('/register',registration)
router.post('/verifyAccount',verifyC)
router.post('/login',login)
router.post('/forgetPassword',forgetPassC)

module.exports = router