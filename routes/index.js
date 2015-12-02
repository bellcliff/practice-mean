var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user', function(req, res){
  console.log('user post req body', req.body);
  res.json({msg: 'ok'});
});

module.exports = router;
