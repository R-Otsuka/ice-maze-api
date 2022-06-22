const express = require('express')
const app = express()
const cors = require('cors');
const router = express.Router();
const port = 3000

app.use(cors({
  origin: 'http://localhost:8080', //アクセス許可するオリジン
  credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  optionsSuccessStatus: 200 //レスポンスstatusを200に設定
}))
app.get('/', (req, res) => {
  console.log("hello world");
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/ice', (req, res) => {
  // ここに氷の迷路アルゴリズムを作る。
  console.log("北");
  res.json({num :1002});;
})

app.use(router);