var express = require('express');
const validator = require('express-validator');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var userRouter = require('./routes/userRoutes');
var homeRouter = require('./routes/homeRoutes');
var chatRouter = require('./routes/chatRoutes');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var flash = require('connect-flash');
var session = require('express-session');
const {Users} = require('./utils/usersClass');
const passport =  require('passport');
//set up express app.
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// const passport =  require('passport');
// Load envirorment variables
dotenv.config({
  path: './config.env'
});

const DB = process.env.DATABASE;
// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

  require('./passport/passport-local')(passport);
  require('./passport/passport-facebook')(passport);
  require('./socket/groupchat')(io, Users);
  require('./socket/friend')(io);

app.use(session({  
  secret: 'meow',
  resave: false, 
  saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
// Middle ware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use('/public', express.static('public'));

//Routes
// app.get('/', function (req, res) {
//   res.render('index');
// });

// use express.Router
app.use('/', userRouter);
app.use('/', homeRouter);
app.use('/', chatRouter);


http.listen(3000, function () {
  console.log('Listening on port 3000!');
});