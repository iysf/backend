var express = require('express');
var router = express.Router();
const url = require('../constants/url')
const mongoose = require('mongoose')

mongoose.connect(url.dataBase, { useNewUrlParser: true }, (err) => {
  console.log('err:', err)
  console.log('连接成功:', err)
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/search/ranking', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.send({
    code: 0,
    data: {
      rankingList: [
        { result: 958 },
        { result: 800 },
        { result: 754 },
        { result: 425 },
        { result: 251 },
      ]
    },
    success: true
  })
})

router.post('/api/save', (req, res, next) => {
  console.log('req:', req)

  res.send({
    code: 0,
    data: {},
    success: true
  })
})

module.exports = router;
