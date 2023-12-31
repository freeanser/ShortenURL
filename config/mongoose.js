const mongoose = require('mongoose')

// 僅在非正式環境時，使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
// once ：一次性的。只要成功open,就移除此監聽器
db.once('open', () => {
  console.log('mongobd connected')
})

module.exports = db