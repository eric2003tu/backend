require('dotenv').config();
const cors = require('cors');
const express = require('express');
const sendTo = require("./routes/emailRoutes");

const app = express();
const port = process.env.PORT || 3000; // ✅ Fallback port

// ✅ Allow requests only from your frontend domains
const allowedOrigins = [
    "https://port-folio-eov.pages.dev",
    "https://new-portfolio-3yim.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'HEAD', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true // If you need to allow credentials
}));

app.use(express.json());

// ✅ Use API routes
app.use('/api', sendTo);

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});