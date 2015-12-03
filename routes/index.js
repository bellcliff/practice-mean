var express = require('express');
var router = express.Router();
var mc = require('mongodb').MongoClient;

router.get('/check', function(req, res, next){
  console.log(req.cookies)
  if (req.session && req.session.usr) {
    console.log('session check')
    res.json({usr: req.session.usr.usr})
  } else {
    res.json({})
  }
})

router.get('/logout', function(req, res){
  if (req.session.usr)
    req.session.destroy()
  res.json({})
})

router.post('/login', function(req, res, next){
  if (req.session.usr) {
    res.json({msg: 'ok'})
    return
  }
  mc.connect('mongodb://localhost:27017/test').then(function(db){
    return db.collection('user').find(req.body).toArray()
  }).then(function(usrs){
    if (!usrs || usrs.length == 0)
      throw new Error('usr not found')
    req.session.usr = usrs[0];
    req.session.save(function(err){
      if (err) {
        next(err);
        return;
      }
      res.json({msg: 'ok'})
    });
  }).catch(function(err){next(err)});
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
