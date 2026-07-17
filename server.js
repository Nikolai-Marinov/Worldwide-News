const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());


app.get("/news", async (req, res) => {

    const city = req.query.city;

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${city}&apiKey=${process.env.NEWS_API_KEY}`
        );

        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({
            error: "Failed to get news"
        });
    }

});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});