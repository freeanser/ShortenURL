// 外部
const express = require("express")
// const bodyParser = require('body-parser') //這種寫法較過時
const exphbs = require("express-handlebars")
const methodOverride = require('method-override')
// 內部
require('./config/mongoose')

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
app.use(methodOverride('_method'))
// app.use(routes)

app.get("/", (req, res) => {
  res.render("index")
})


app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})