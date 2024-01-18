let router = require('express').Router();
require('express-group-routes');
let AuthMiddleware = require("../middlewares/AuthMiddleware")
router.use('/api/v1',require("./api"))
router.use('/auth',require("./auth"))
router.use('/admin',require("./admin"))
router.use('/',require("./user"))

module.exports = router ;
