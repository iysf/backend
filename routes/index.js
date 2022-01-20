var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect(
  'mongodb://houxiaochen:zhaozhao719@docdb-2022-01-20-10-20-34.cb4jxav3ugif.ap-south-1.docdb.amazonaws.com:27017/rankingList?retryWrites=false&authSource=admin',
  { useNewUrlParser: true },
  (err) => {
    console.log('err:', err)
    console.log('连接成功:', err)
    const SaveSchema = Schema({ result: Number })

    const SaveModal = mongoose.modal('cats', SaveSchema)
    const instance = new CatModal({ result: 20 })

    instance.save((e, res) => {
      console.log('e:', e)
      console.log('res:', res)
    })
  }
)

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
