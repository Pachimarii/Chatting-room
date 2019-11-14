var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var http =  require('http');
var passport = require('passport');
var flash = require('flash');
var userRoute = require('./routes/userRoutes');
mongoose.Promise = global.Promise;

var User = require('./models/userModels');

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE;
console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));
  require('./passport/passport-local')(passport);
var app = express();
// Middle ware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
  }));
  app.set('view engine', 'hbs');
  app.use('/public', express.static('public'));

  app.use('/signup',userRoute);

  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/home', homePage);

  app.listen(3000, function () {
    console.log('Listening on port 3000!');
  });

  function homePage(req,res){
    return res.render('home');
  }

  