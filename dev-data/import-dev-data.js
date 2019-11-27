const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Game = require('../models/gameModels');

dotenv.config({ path: '../config.env' });
// ../config.env
const DB = process.env.DATABASE;
console.log(DB);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful.'));
// read JSON FILE
const games = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

//Import data into database
const importData = async () => {
  try {
    //create() can accept an array of data
    await Game.create(games);
    console.log('Data successfully loaded!');
    //stop our application
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
    try {
      //delete all document in db
      await Game.deleteMany();
      console.log('Data successfully deleted!');
      process.exit();
    } catch (err) {
      console.log(err);
    }
  };
  
  
  if (process.argv[2] === '--import') {
    importData();
  } else if (process.argv[2] === '--delete') {
    deleteData();
  }
  