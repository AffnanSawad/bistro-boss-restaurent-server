const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
// dotEnv
require('dotenv').config()


// middleware
app.use(cors())
app.use(express.json())




// mongoDB = CONNECT = DRIVER

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@atlascluster.5qhzsjb.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

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


    const database = client.db("bistroBoss");
    const menuCollection = database.collection("menu");
    const reviewsCollection = client.db("bistroBoss").collection("reviews")


    // get menu
    app.get('/menu', async(req,res)=>{

      const result = await menuCollection.find().toArray()
      res.send(result)
    } )

     // get = reviews
     app.get('/reviews', async(req,res)=>{

      const result = await reviewsCollection.find().toArray()
      res.send(result)
    } )




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);







// basic SetUp
app.get('/', (req,res)=>{

    res.send('BISTRO BOSS RESTAURENT')
} )

app.listen(port,()=>{

    console.log(`BISTRO BOSS RESTAURENT RUNNING ON ${port}`)
} )