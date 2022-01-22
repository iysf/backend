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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  mongoose.model('result', SaveSchema).find({}, 'result -_id').sort({ result: -1 }).limit(5).exec((error, result) => {
    if (error) {
      res.send({
        code: 1,
        data: '查询失败',
        success: false
      })
    } else {
      res.send({
        code: 0,
        data: {
          rankingList: result
        },
        success: true
      })
    }
  })
})

router.get('/api/save', async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  const query = req.query

  if (!query.result) {
    res.send({
      code: 1,
      data: '请传入成绩',
      success: false
    })
    return
  }

  const { result } = query
  const ResultModal = mongoose.model('result', SaveSchema)

  // 去重，假如已存在该成绩，则不保存。
  const docs = await new Promise((resolve, reject) => {
    ResultModal.find({ result: result }, 'result -_id', (err, docs) => {
      if (err) {
        reject(err)
      } else {
        resolve(docs)
      }
    })
  })

  if (docs && docs.length) {
    console.log('数据重复了')
    res.send({
      code: 0,
      data: {},
      success: true
    })
    return
  }
  const insertSuccess = await new Promise((resolve, reject) => {
    ResultModal.insertMany({ result: result }, (error, success) => {
      if (error) {
        reject(error)
      } else {
        resolve({})
      }
    })
  })

  res.send({
    code: 0,
    data: {},
    success: true
  })
})

module.exports = router;
