require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

// connect to MongoDB
connectDB();

// middleware
app.use(credentials);
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());


// routes
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// API routes
app.use(verifyJWT);
app.use('/api/books', require('./routes/api/books'));
app.use('/api/users', require('./routes/api/users'));

// once DB is connected listen for requests
mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})