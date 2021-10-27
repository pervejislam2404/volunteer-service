const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 2050;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qvyqk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("volunteer-service");
        const volunteerCollection = database.collection("volunteers");
        app.get('/services', async(req, res) => {
            const query = {};
            const result = await volunteerCollection.find(query).toArray();
            res.json(result);
        })

        app.get('/service/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await volunteerCollection.findOne(query)
            res.send(result)
        })
    } finally {

    }
}
run().catch(console.dir)

// app.get('/', (req, res) => {
//     res.send('this is home page')
// })

app.listen(port, () => {
    console.log('server running on port ' + port);
})