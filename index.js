const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

// Config
dotenv.config();
const PORT = process.env.PORT || 5000;

// MiddleWare
app.use(cors({
    origin: [
        'http://localhost:4173',
        'http://localhost:5173',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(cookieParser());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xmhoqrm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const productsCollection = client.db('e-commerce').collection('products');
        const usersCollection = client.db('e-commerce').collection('users');


        // get all products data
        app.get('/products', async (req, res) => {
            const products = await productsCollection.find.toArray();
            res.send(products);
        })

        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
}
run().catch(console.dir);




// Root route
app.get('/', (req, res) => {
    res.send('E-commerce website server is running...')
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});