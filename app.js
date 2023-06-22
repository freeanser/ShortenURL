// 外部
const express = require("express")

// 內部

// 套件產生的值
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})