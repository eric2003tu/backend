require('dotenv').config();
const cors = require('cors');
const express = require('express');
const sendTo = require("./routes/emailRoutes");

const app = express();
const port = process.env.PORT || 3000; // ✅ Fallback port

// ✅ Allow requests only from your frontend domain
app.use(cors({
    origin: "https://port-folio-eov.pages.dev", // ✅ Your frontend URL
    methods: ['GET', 'POST', 'HEAD', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// ✅ Use API routes
app.use('/api', sendTo);

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
