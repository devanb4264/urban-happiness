const express = require('express')
const app = express()

console.log('im on a node server, yo');

app.use(express.static('./')) 
app.get('/', function (req, res) {
  res.send('Hello Node from Ex on local dev box')
  res.sendFile('index.html');
  res.sendFile('scripts/script.js');
  res.sendFile('styles/style.css');
})

app.listen(3000)
