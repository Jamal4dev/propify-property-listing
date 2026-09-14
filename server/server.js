const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();


const connectDB = require("./config/db");

const propertyRoutes = require("./routes/propertyRoutes");



const app = express();



// Connect Database

connectDB();




// Security Middleware

app.use(
    helmet()
);




// CORS Configuration

app.use(
    cors({

        origin: [

            "http://localhost:5173"

        ],

        methods: [

            "GET",
            "POST",
            "PUT",
            "DELETE"

        ],

        credentials: true

    })
);




// Body Parser

app.use(
    express.json()
);




// API Routes

app.use(
    "/api/properties",
    propertyRoutes
);




// Health Check Route

app.get("/", (req, res) => {

    res.json({

        message:
            "Propify API is running",

        status:
            "success"

    });

});




// Global Error Handler

app.use(
    (err, req, res, next) => {


        console.error(err.stack);


        res.status(500).json({

            message:
                "Something went wrong on the server"

        });


    }
);




// Server Port

const PORT =
    process.env.PORT || 5000;




app.listen(PORT, () => {


    console.log(
        `🚀 Server running on port ${PORT}`
    );


});