const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://root:5ZHAOzhao@dds-a2dcaf70ebd1df341837-pub.mongodb.ap-south-1.rds.aliyuncs.com:3717,dds-a2dcaf70ebd1df342383-pub.mongodb.ap-south-1.rds.aliyuncs.com:3717/admin?replicaSet=mgset-1050168670',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log('连接数据库失败：', err)
    } else {
      console.log('连接数据库成功')
    }
  }
)

/**
  * 存储积分表数据结构
  * 积分表
  * @param result {Number} 积分
 */
const SaveSchema = new mongoose.Schema({
  result: Number
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/search/ranking', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')

  mongoose.model('result', SaveSchema).find({}, 'result -_id', (err, docs) => {
    res.send({
      code: 0,
      data: {
        rankingList: docs
      },
      success: true
    })
  })

})

router.post('/api/save', (req, res, next) => {
  console.log('req:', req)

  // const SaveModal = mongoose.model('result', SaveSchema).insertMany({ result: 852 }, (error, res) => {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log(`SaveSchema 表，'insert ok'`)
  //   }
  // })

  res.send({
    code: 0,
    data: {},
    success: true
  })
})

module.exports = router;
