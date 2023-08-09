const express = require('express');
const app = express();
require('dotenv').config({ path: "./config/.env" });

require('./config/db');
const port = process.env.PORT || 5000

const User = require('./model/user')
app.use(express.json())

const users = [
  {
    id : 1,
    nom : 'Lo',
    prenom : 'Mouhamed',
    email : 'lomoustapha95@gmail.com'
  },
  {
    id : 2, 
    nom : 'Ndiaye',
    prenom : 'khadidiatou',
    email : 'khadija13@gmail.com'
  },
  {
    id : 3, 
    nom : 'Mbengue', 
    prenom : 'Abdoulaye', 
    email : 'mbenguediop@gmail.com'
  },
  {
    id : 4, 
    nom : 'Badiane', 
    prenom : 'Ibrahima', 
    email : 'badiane127@gmail.com'
  }
]
User.create(users, (err, data) =>{
    if(err){
        console.error(err);
    }
    else
        console.log('Ajouté');
})



// API ROUTES
// get all users
app.get("/", (req, res) => {
 User.find((err,users)=>{
    if(err){
        res.send(err);
    }
    res.json(users)
 })
   
});


//Add New User

app.post('/users',(req,res)=>{
    User.create(req.body,(err,use)=>{
        if(err){
            res.send(err);
        }
        res.json(use);
    });
});


//Modify User By Id

app.put("/users/:id", (req,res)=>{
    User.findByIdAndUpdate(req.params.id, req.body,(err,use)=>{
        if(err){
            res.send(err);
        }
        res.json(use)
    });
});

//Delete User By Id

app.delete('/users/:id', (req,res)=>{
    User.findByIdAndRemove(req.params.id, (err,user)=>{
        if(err){
            res.send(err)
        }
        res.json(user)
    });
});



app.listen(port, function () {
    console.log('The server is running, ' +
        'please, open your browser at http://localhost:%s',
        port);
});