const express = require('express')
const app = express()

console.log('im on a node server, here is my doge game');

app.use(express.static('./public/')) 
app.get('/', function (req, res) {
  //res.send('Hello Node from Ex on local dev box')
  res.sendFile('public/index.html');
  res.sendFile('scripts/script.js');
  res.sendFile('styles/style.css');
})

app.listen(3000)
