const express = require('express')
const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./public/')) 
console.log('im on a node server, here is my doge game');

app.get('/', function (req, res) {
  //res.send('Hello Node from Ex on local dev box')
  res.sendFile('index.html');
  res.sendFile('scripts/script.js');
  res.sendFile('styles/style.css');
})
app.get('/ejs', (req, res)=> {

  res.render('index', {
    myServerVariable : "something from server"
  });

  //can you get content from client... to console?
})

app.listen(3000)
