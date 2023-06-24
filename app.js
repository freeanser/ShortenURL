// 外部
const express = require("express")
// const bodyParser = require('body-parser') //這種寫法較過時
const exphbs = require("express-handlebars")
const methodOverride = require('method-override')
// 內部
require('./config/mongoose')
const URL = require("./models/URL")

// 套件產生的值
const app = express()
const port = 3000

// 引用自己定義好的設定
// const routes = require('./routes') 


// 使用
app.use(express.urlencoded({ extended: true }))
app.engine("hbs", exphbs({ defaultLayout: "main", extname: '.hbs' }))
app.set("view engine", "hbs")
app.use(express.static("public"))
app.use(methodOverride('_method')) // 結果沒有用到
// app.use(routes)

app.get("/", (req, res) => {
  res.render("index")
})

app.post("/", (req, res) => {
  const reqURL = req.body.url
  let shortenURL = require('./utils/shortenURL')
  res.render("index", { reqURL })
  // 從資料庫中找出 reqURL
  // 如果找到了，就渲染出來 // 如果沒有，就建立新的資料，然後渲染出來 
  //三元運算符 // data ? a : b // 如果 data 有值，它會執行 a，否則它會執行 b
  URL.findOne({ originalURL: reqURL }) // originalURL中有沒有 reqURL
    // 當這個查詢成功完成時，它將返回找到的 URL 文件，並且這個結果將作為 data 傳遞到下一個 .then() 塊
    .then(data => {
      data ? data : URL.create({
        shortURL: shortenURL,
        originalURL: reqURL
      })
    })
    .then(data => {
      res.render('index', {
        orginal: req.headers.orginal,
        shortURL: data.shortURL
      })
    })
    .catch(error => console.error(error))

  app.get('/:shortURL', (req, res => {
    const { shortURL } = req.params
  }))
  // console.log(shortenURL)
})


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})