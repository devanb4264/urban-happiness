require('dotenv').config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')

console.log("I'm on a node server")

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('./public/'))

//cheese hash value
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


app.get('/', function (req, res) {
   await client.connect();
        const result = await client.db("Effective-lamp").collection("Effective-lamp").find({}).toArray();
        res.render('index', {
            postData: result
        });
});

app.get('/ejs', (req, res)=>{
    res.render("mongo", {
      mongoResult: result[0].post
    });
})

//CRUD OPS]
//read
app.get('/', async (req, res) => {
        await client.connect();
        const result = await client.db("dean's-db").collection("whatever-collection").find({}).toArray();
        res.render('index', {
            postData: result
        });
      });



//insert
app.post('/saveConverted', async (req, res) => {
    const { convertedText } = req.body;
        await client.connect();
        await client.db("devan's-db").collection("whatever-collection").insertOne({ post: convertedText });
        res.redirect('/');
});

//update
app.post('/update/:id', async (req, res) => {
    const postId = req.params.id;
    const { newPost } = req.body;
        await client.connect();
        await client.db("Effective-lamp").collection("Effective-lamp").findOneAndUpdate(
            { "_id": new ObjectId(postId) },
            { $set: { "post": newPost } }
        );
        res.redirect('/');
});

//delete
app.post('/delete/:id', async (req, res) => {
    const postId = req.params.id;
        await client.connect();
        await client.db("devan's-db").collection("whatever-collection").findOneAndDelete({ "_id": new ObjectId(postId) });
        res.redirect('/');
});
  //insert into it

})

app.listen(5000)
console.log('Server is listening on port 5000');
