const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require ('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require ('express-validator');

// import mongoose
const mongoose = require('mongoose');
// load env variables
const dotenv = require('dotenv');
dotenv.config()
 
//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
.then(() => console.log('DB Connected'))
 
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});
mongoose.set('useCreateIndex', true);

//routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/', postRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({error: "You're not allowed to access this page"});
  }
});


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})