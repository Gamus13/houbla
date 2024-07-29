const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5844;
const mongoURI = process.env.MONGO_URI;
const { MongoClient, ServerApiVersion } = require("mongodb");

// App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Vérifiez si mongoURI est défini
if (!mongoURI) {
    console.error("Mongo URI is not defined. Please check your .env file.");
    process.exit(1); // Arrêtez le processus si la variable n'est pas définie
}

// Mongo URI
const client = new MongoClient(mongoURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const run = async () => {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Vous pouvez fermer la connexion si nécessaire
    }
}

run().catch(error => console.error("Error connecting to MongoDB:", error));

app.get('/', (req, res) => {
    res.send('Car Junction Backend Server Running...');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
