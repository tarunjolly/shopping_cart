const express = require('express')
const app = express()
const { db, users, products, addtocart } = require('./db')
const productroute = require('./routes/products')
const usersroute = require('./routes/users')
//const mycart=require('./routes/mycart')

app.use(express.json())
app.use(express.urlencoded(({ extended: true })))

app.set('view engine', 'hbs')
app.use('/', express.static(__dirname + '/public'))
app.use('/products', productroute)
app.use('/users', usersroute)
//app.use('/mycart',mycart)



//add to cart

app.post('/tobeaddedtocart', (req, res) => {
    products.findOne({
        where: {
            name: req.body.name
        }
    }).then((item) => {
        addtocart.create(item.dataValues).then(cartitem=>{
            res.json(cartitem)
        }).catch(()=>{
            addtocart.findAll({where:{name :item.dataValues.name}}).then(r=>{
                console.log(r)
               addtocart.increment('quantity',{where:{name : item.dataValues.name}})
            })
        }) 
        
    })
})


app.get('/addtocart', (req, res) => {
    addtocart.findAll().then((all) => {
        res.send(all)
    })
})

app.post('/deletefromcart', (req, res) => {
    addtocart.destroy({ where: { name: req.body.name } })
        .then((data) => {
            addtocart.findAll().then((all) => {
                res.send(all)
            })
        })
})


//views folder
app.get('/shop', (req, res) => {
    res.render('products')
})

app.get('/add', (req, res) => {
    res.render('add')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/mycart', (req, res) => {
    res.render('mycart')
})

app.get('/payment',(req,res)=>{
    res.render('payment')
})




orders=[]
//payment
app.get('/final',(req,res)=>{
    res.render('final')
})

app.post('/order',(req,res)=>{
    var obj={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cardnumber:req.body.number,
        expdate:req.body.date
    }
    orders.push(obj)
    res.redirect('/final')
})

app.listen(4000, () => {
    console.log('http://localhost:4000')
})