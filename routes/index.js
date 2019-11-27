var express = require('express');
var router = express.Router();
var user = require("../db/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {  });
});


router.post('/index/login', async function(req, res, next) {
        try{
                let id = await user.getUserId(req.body.Login, req.body.Pass);
                res.redirect('/info?id=' + id);

        } catch(err) {
                console.log(err);
                console.log('err');
                res.render('index', {err})
        }
});


router.post('/index/reg', async function(req, res, next) {
        try {
                let id = await user.addUser(req.body.NewName, req.body.NewLogin, req.body.NewPass);
                res.redirect('/info?id=' + id);

        } catch (err) {
                console.log(err);
                console.log('err');
                res.render('index', {err});
        }
});

router.get('/index/logout', async function(req,res, next) {
        res.redirect('/')
});

module.exports = router;
