const express = require('express')
const bodyParser = require('body-parser');
const db = require("./db")

const database = new db("./storage.db");
const app = express()
app.use(bodyParser.json());

app.get("/api", async (req, res) => {
    const expense = await database.getExpenses();
    res.status(200).json(expense)
})


app.post('/api', async (req, res) => {
    const { type, cost, item, desc } = req.body;
    const date = new Date().toISOString()
    try {
        const message = await database.addExpense(date, type, cost, item, desc);
        res.status(201).send(message);
    } catch (err) {
        res.status(400).send(err);
    }

});



app.listen(5000, () => { console.log("Server started on port 5000") })