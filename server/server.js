const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const propertyRoutes = require("./routes/propertyRoutes");


const app = express();


connectDB();


// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/properties", propertyRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("Propify API is running");
});


// Server port
const PORT = process.env.PORT || 5000;


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});