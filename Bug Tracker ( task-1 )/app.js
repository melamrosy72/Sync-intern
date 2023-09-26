const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config()
const { connectDatabase } = require('./config/db')
const bugsRoute = require('./routes/bugsRoute')
const authRoute = require('./routes/authRoute')
const usersRoute = require('./routes/usersRoute')


const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Database connection
connectDatabase();

// Routes
app.use('/bugs', bugsRoute)
app.use('/auth', authRoute)
app.use('/users', usersRoute)


//handling general error
app.all('*', (req, res, next) => {
    const error = new Error(`Not found , there is no route for this url : ${req.originalUrl}`)
    error.statusCode = 404;
    next(error)
})
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.statusCode || 500).json({ error: error.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`The Server Is Working And listening to Port ${PORT}`);
})
