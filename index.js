require('dotenv').config();
const express = require('express');
const cors = require('cors');
const emailRoutes = require('./routes/emailRoutes');

const app = express();
const port = process.env.PORT || 2000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://new-portfolio-3yim.onrender.com',
        'https://port-folio-eov.pages.dev'
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api', emailRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${port}`);
});