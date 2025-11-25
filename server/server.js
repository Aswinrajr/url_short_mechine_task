import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import linkRoutes from './routes/linkRoutes.js';
import Link from './models/Link.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

app.get('/healthz', (req, res) => {
    res.status(200).json({
        ok: true,
        version: '1.0',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

app.use('/api/links', linkRoutes);

app.get('/:code', async (req, res) => {
    try {
        const code = req.params.code.toUpperCase();

        const RESERVED_PATHS = ['api', 'healthz', 'code', 'admin', 'dashboard'];
        if (RESERVED_PATHS.includes(code.toLowerCase())) {
            return res.status(404).json({
                success: false,
                message: 'Link not found'
            });
        }

        const link = await Link.findOne({ code });

        if (!link) {
            return res.status(404).json({
                success: false,
                message: 'Link not found'
            });
        }

        link.clicks += 1;
        link.lastClicked = Date.now();
        await link.save();

        let redirectUrl = link.url;
        if (!/^https?:\/\//i.test(redirectUrl)) {
            redirectUrl = 'http://' + redirectUrl;
        }

        return res.redirect(302, redirectUrl);
    } catch (error) {
        console.error('Error redirecting:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error during redirect'
        });
    }
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`Health check: http://localhost:${PORT}/healthz`);
    });
};

startServer();

export default app;