const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();


const connectDB = require("./config/db");

const propertyRoutes = require("./routes/propertyRoutes");



const app = express();
const allowedOrigins = new Set((process.env.CORS_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean));

app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin is not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json({ limit: "1mb" }));




// API Routes

app.use(
    "/api/properties",
    propertyRoutes
);




// Health Check Route

app.get("/", (req, res) => {
    res.json({
        success: true,
        data: {
            message: "Propify API is running"
        }
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});




// Global Error Handler

app.use(
    (err, req, res, next) => {


        console.error(err.stack);


        let statusCode = err.statusCode || 500;
        if (err.type === "entity.parse.failed") statusCode = 400;
        if (err.message === "Origin is not allowed by CORS") statusCode = 403;

        let message = err.message;
        if (err.type === "entity.parse.failed") message = "Invalid JSON payload";
        if (statusCode === 500) message = "Something went wrong on the server";

        res.status(statusCode).json({
            success: false,
            message
        });


    }
);




// Server Port

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();