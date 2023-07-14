import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv'
import morgan from 'morgan';
// HTTP request logger middleware for node.js
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';

dotenv.config({path: './.env'});

// connect to database
connectDB();

// rest object
const app = express();

// middlewares
// using default json parser provided by express, instead of body-parser
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRoutes);

app.get('/', (req,res) => {
    res.status(200).send('<h3>Welcome to Home page</h3>')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})