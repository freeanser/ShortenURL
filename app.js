// 外部
const express = require("express")
const exphbs = require("express-handlebars")
// 內部
require('./config/mongoose')
const routes = require('./routes')

// 套件產生的值
const app = express()
const port = 3000

// 使用
app.use(express.urlencoded({ extended: true }))
app.engine("hbs", exphbs({ defaultLayout: "main", extname: '.hbs' }))
app.set("view engine", "hbs")
app.use(express.static("public"))
app.use(routes)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})