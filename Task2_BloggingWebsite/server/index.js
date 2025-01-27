import express from 'express';
import Connection from './databse/db.js';

import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
dotenv.config();

// app.use(cors()); // development phase
const corsOptions = {
    origin: 'https://blogsphere-adil-ahmed.netlify.app', // Replace with your Netlify frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // If using cookies or sessions
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));
app.use('/', Router);

// Error Handling
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

//const PORT = 8000; // development phase
const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT ${PORT}`)
});

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;


Connection(USERNAME, PASSWORD);