require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI;

console.log("I'm on a node server")

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('./public/'))

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
// function whateverNameOfIt (params) {}
// ()=>{}

app.get('/mongo', async (req,res)=>{
  console.log("im in mongo!");
  await client.connect();
    // Send a ping to confirm a successful connection
 let result = await client.db("devans-db").collection("whatever-collection").find({}).toArray();
 //res.send(result); to send result to browser
  console.log(result);
    // db.close();

  })

app.get('/', function (req, res) {
  //outdated way
  //res.send('Hello Node From Express on local devbox :))))')
  res.sendFile(__dirname + '/index.html')
  res.sendFile(__dirname + '/styles/style.css')
  res.sendFile(__dirname + '/scripts/script.js')
})

app.get('/ejs', (req, res)=>{
    res.render("index", {
      myServerVariable: "Something from server"
    })
})

//CRUD OPS
app.get('/read', async (req, res)=>{

  console.log('in /mongo');
  await client.connect();
  
  console.log('connected?');
  // Send a ping to confirm a successful connection
  
  let result = await client.db("devans-db").collection("whatever-collection")
    .find({}).toArray(); 
  console.log(result); 

  res.render('mongo', {
    postData : result
  });

})

app.get('/insert', async (req,res)=> {

  console.log('in /insert');
  //connect to db,
  await client.connect();
  //point to the collection 
  await client.db("devans-db").collection("whatever-collection").insertOne({ post: 'hardcoded post insert '});
  await client.db("devans-db").collection("whatever-collection").insertOne({ iJustMadeThisUp: 'hardcoded new key '});  
  //insert into it
  res.render('insert');

}); 

app.post('/update/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect;
  const collection = client.db("devans-db").collection("whatever-collection");
  let result = await collection.findOneAndUpdate( 
  {"_id": new ObjectId(req.params.id)}, { $set: {"post": "NEW POST" } }
)
.then(result => {
  console.log(result); 
  res.redirect('/read');
})
}); 

app.post('/delete/:id', async (req,res)=>{

  console.log("req.parms.id: ", req.params.id)

  client.connect; 
  const collection = client.db("devans-db").collection("whatever-collection");
  let result = await collection.findOneAndDelete( 
  {"_id": new ObjectId(req.params.id)})

.then(result => {
  console.log(result);
  res.redirect('/read');
})
})

app.listen(5000)
