const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const printRoutes = require('./routes/print'); // Importe o arquivo de rotas

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas conectado'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas', err));

// Use as rotas
app.use('/', printRoutes); // Registre as rotas com a raiz da aplicação

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));



/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://raphaelyoshiki:6CMI9dkjkwGMll2U@papershark-cluster0.s2jsu.mongodb.net/?retryWrites=true&w=majority&appName=PaperShark-Cluster0";

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
run().catch(console.dir);*/
