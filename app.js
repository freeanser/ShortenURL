// 外部
const express = require("express")
const exphbs = require("express-handlebars")
const methodOverride = require('method-override')
// 內部
require('./config/mongoose')
const URL = require("./models/URL")
const shortenURL = require('./utils/shortenURL')

// 套件產生的值
const app = express()
const port = 3000

// 使用
app.use(express.urlencoded({ extended: true }))
app.engine("hbs", exphbs({ defaultLayout: "main", extname: '.hbs' }))
app.set("view engine", "hbs")
app.use(express.static("public"))
app.use(methodOverride('_method')) // 結果沒有用到

function generateRandomURL(length) {
  const shortURL = shortenURL(length);
  // 在此處使用短網址...
  // console.log(shortURL);
  return shortURL
}
generateRandomURL(5)

// app.use(routes)

// routers
app.get("/", (req, res) => {
  res.render("index")
})

// 縮短網址
app.post("/", (req, res) => {

  const reqURL = req.body.url
  const shortURL = generateRandomURL(5)
  console.log('shortURL:', shortURL)
  if (!reqURL) {
    return res.redirect('/')
  }

  //三元運算符 // data ? a : b // 如果 data 有值，它會執行 a，否則它會執行 b
  URL.findOne({ originalURL: reqURL }) // 從資料庫中找出originalURL中有沒有 reqURL
    // 當這個查詢成功完成時，它將返回找到的 URL 文件，並且這個結果將作為 data 傳遞到下一個 .then() 

    .then(data => {
      // 如果沒有，就建立新的資料，然後渲染出來
      if (!data) {
        return URL.create({
          shortURL,
          originalURL: reqURL
        })
      }
      return data
    })

    // 如果找到了，就渲染出來
    .then(data => {
      res.render('index', {
        origin: req.headers.origin,
        shortURL: data.shortURL,
        reqURL
      })
    })
    .catch(error => console.error(error))
})

// 輸入縮短的網址
app.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  // 先去資料庫中找到 shortURL
  URL.findOne({ shortURL })
    .then(data => {
      // 找不到資料 ＝> error 頁面
      if (!data) {
        return res.render('error', {
          errorMsg: 'Can not find the Link.',
          errorURL: req.headers.host + '/' + shortURL,
        })
      } if (data) {
        // 找到資料
        res.redirect(data.originalURL)
      }
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})