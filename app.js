require('dotenv').config();
const express = require("express");
const path = require("path");
// const fs= require("fs"); 
const app = express();
const PORT = process.env.PORT || 80;

const mongoose = require('mongoose');
const bodyparser= require('body-parser');
main().catch(err => console.log(err));
async function main() {
  mongoose.set('strictQuery', false);
  const conn=await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB is connected: ${conn.connection.host}`);
}

//define schemas

const contactSchema = new mongoose.Schema({
  name: String,
  age: String,
  email: String,
  phoneno: String,
  category: String
});

//create model
const Contact = mongoose.model('Contact', contactSchema);

// express specific
app.use('/static', express.static('static'));  // For serving static files
app.use(express.urlencoded());

// pug specific
app.set('view engine', 'pug'); // set the template engine for pug
app.set('views', path.join(__dirname, 'views')); // set the view directory

app.get('/', (req, res) => {
  const params = {};
  res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
  const params = {};
  res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
  var myData= new Contact(req.body);
  myData.save().then(()=>{
 
     res.send("Your contact details has been saved succesfully");

  }).catch(()=>{
    
    res.status(400).send("Sorry ! items has not been sent");

  });

});


app.listen(PORT, () => {
  console.log(`The port is started successfully on port ${PORT}`);
});