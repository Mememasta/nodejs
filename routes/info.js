var express = require('express');
var router = express.Router();
//var state = require('../db/state');
var user = require('../db/user');



/* GET users listing. */
router.get('/', async function(req, res, next) {
        let result = {name:'-'};

        try{
                result = await user.userInfo(req.query.id);
        } catch(err) {
                result.err = err;
        }
        res.render('info', result);
});

module.exports = router;
