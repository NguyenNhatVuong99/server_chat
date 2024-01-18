let router = require('express').Router();
require('express-group-routes');
let AuthMiddleware = require("../middlewares/AuthMiddleware")
router.use('/api/v1',require("./api"))

module.exports = router ;
