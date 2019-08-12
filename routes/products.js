const route=require('express').Router()
const {db,users,products,addtocart}=require('../db')
const multer =require('multer')
const path =require('path')
const fs=require('fs')

const uploadFolder = "./public/uploads";
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
  }
  
  var storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, uploadFolder);
    },
    filename: function(req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  var upload = multer({ storage: storage });




route.get('/',(req,res)=>{
    products.findAll().then((products)=>{
        res.send(products)
    })
})


//to add a new product into database
// route.post('/',(req,res)=>{
//     products.create({
//         name:req.body.name,
//         manufacturer:req.body.manufacturer,
//         price:req.body.price,
//         type:req.body.type,
//         Image:req.body.image
//     }).then((users)=>{
//         res.redirect('/')
//     })
// })

route.post('/',upload.single("prod_image"),(req,res)=>{
    if((req.body.name !="")&&(req.body.manufacturer !="")&&(req.body.price !="")){
     console.log(req.file.filename)
     console.log(req.filename) 
       products.create({
       name:req.body.name,
       manufacturer:req.body.manufacturer,
       price:req.body.price,
       type:req.body.type,
       Image : req.file.filename
   }).then((users)=>{
       
       res.render('products')
   })}
   else{this.alert('Kindly fill all the field to add')
       res.render('add',)
   }
})


module.exports=route