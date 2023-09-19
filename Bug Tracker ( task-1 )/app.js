const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const client = require('./config/db')
require('dotenv').config()
const PORT = process.env.PORT || 8080
const morgan = require('morgan')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use(cors())

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(error => console.error('Error connecting to the database:', error)
);

const bugsRoute=require('./routes/bugsRoute')
const authRoute=require('./routes/authRoute')

app.use('/bugs',bugsRoute)
app.use('/auth',authRoute)


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/login',(req,res)=>{
    res.render('login')
})
app.use('/signup',(req,res)=>{
    res.render('signup')
})

app.listen(PORT, () => {
    console.log(`The Server Is Working And listening to Port ${PORT}`);
})
