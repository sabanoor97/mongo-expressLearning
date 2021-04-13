const express = require('express')
const expressObj = express()
expressObj.use(express.static('./view'))

var bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
expressObj.use(bodyParser.json())

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanatizeBody } = require('express-validator/filter')

//setting engine
expressObj.set('view engine', 'twig')
expressObj.set('views', './view')

//displaying form
expressObj.get('/form', (req, res) => {
    res.render('registration', { banquet: "Himalya", location: "Karachi" })
})

//post form data
expressObj.post('/form_data', urlencodedParser, [
    check('email', 'invalid user email').trim().isEmail(),
    check('password', 'password must be 5 characters').trim().isLength({ min: 5 }),
    check('c_password').custom((value, { req }) => {
        if (value != req.body.password) {
            throw new Error("confirm password does not match")
        }
        return true
    })
], function (req, res) {
    const errorCheck = validationResult(req)
    console.log(errorCheck.mapped())
    if (!errorCheck.isEmpty()) {
        const user = matchedData(req)
        res.render('registration', { email: " Enter email ", error: errorCheck.mapped(), user: user })
    }
    else {
        const user = matchedData(req)
        console.log(user)
        res.render('show_data', { banquet: "Got it", error: errorCheck.mapped(), user: user })
    }
})

expressObj.listen(7898, console.log("Server started"))




