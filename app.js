require('dotenv').config();
const express = require('express')
const app = express()

app.set('view engine', 'ejs')
console.log("I'm on a node server")

app.use(express.static('./public/'))

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.URI;
//console.log(uri);

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
    res.render("mongo", {
      mongoResult: result[0].post
    });
})

app.listen(5000)
