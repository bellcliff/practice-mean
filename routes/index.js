var express = require('express');
var router = express.Router();
var mc = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/user', function(req, res, next){
  console.log('user post req body', req.body);
  mc.connect('mongodb://localhost:27017/test').then(function(db){
    return db.collection('user').update(req.body, req.body, {upsert: true})
  }).then(res.json.bind(res)).catch(function(err){next(err)});
});

router.get('/user', function(req, res, next){
  mc.connect('mongodb://localhost:27017/test').then(function(db){
    return db.collection('user').find().toArray()
  }).then(res.json.bind(res)).catch(function(err){next(err)});
});

module.exports = router;
