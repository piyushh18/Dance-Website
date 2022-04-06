const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});


//Define mongoose schema.
const contactSchema = new mongoose.Schema({
    name: String,
    Email: String,
    phone: String,
    address: String,
    concern: String

  });

var contact = mongoose.model('Contact', contactSchema);


// const server = '127.0.0.1'
const app = express();
const port = 8000;

//Express specific configuration.
app.use(('/public') , express.static('public')) //for serving static files.
app.use(express.urlencoded());

// pug specific configuration.
app.set('view engine' , 'pug');  //set the template as pug.
app.set('views' ,path.join(__dirname , 'views')) //set the views directory.

//Endpoints.
app.get("/" ,(req , res)=>{

    let x ={};
    res.status(200).render('home.pug',x);

});
app.get("/contact" ,(req , res)=>{
    res.status(200).render('contact.pug');

});

app.post("/contact" ,(req , res)=>{
    // Name = req.body.name
    // Email = req.body.Email
    // phone = req.body.phone
    // address = req.body.address
    // concern = req.body.concern

    // let outputTowrite = `Received data  \nname:${Name}\nEmail:${Email}\nPhone No:${phone}\nAddress:${address}\nConcern:${concern}`
    // fs.writeFileSync('output.txt' ,outputTowrite);
    var mydata = new contact(req.body);
    mydata.save().then(() =>{
          res.send("This item is saved to the database")
    }).catch(() =>{
        res.status(400).send("item is not sved to the database");
    })
    // res.status(200).render('contact.pug');

});


//start the server.
app.listen(port , ()=>{
    console.log(`The server is running at port:${port}`)
})