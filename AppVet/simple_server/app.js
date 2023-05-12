var express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Vet', { useNewUrlParser: true , useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)});

const PetRoute = require('./routes/pet.route');
const Pet = require('./model/Pet');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/Pet', PetRoute);
app.get('/', PetRoute);
app.get("/pet/:id",PetRoute);
app.get("/pet/:name",PetRoute);


app.listen(3000,function(){
    console.log('Listening on port 3000!');
});