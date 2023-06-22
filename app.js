// 外部
const express = require("express")
const bodyParser = require('body-parser')
const exphbs = require("express-handlebars")
// 內部
require('./config/mongoose')

// 套件產生的值
const app = express()
const port = 3000

// 使用
app.use(bodyParser.urlencoded({ extended: true }))
app.engine("hbs", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars")
app.use(express.static("public"))




app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})