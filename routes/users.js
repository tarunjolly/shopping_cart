const route=require('express').Router()
const {db,users,products,addtocart}=require('../db')



//users 
//to get the data of all users from database
route.get('/',(req,res)=>{
    users.findAll().then((users)=>{
        res.send(users)
    })
})

//to add a new user into database
route.post('/',(req,res)=>{
    users.create({
        name:req.body.name
    }).then((users)=>{
        res.sendStatus(200)
    })
})

module.exports=route