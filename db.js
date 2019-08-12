const sequelize=require('sequelize')

const db=new sequelize({
    dialect:'sqlite',
    storage:'shop.db'
})

const products=db.define('products',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    manufacturer:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0,
    },
    type:{
        type:sequelize.STRING
    },
    Image:{
        type:sequelize.STRING
    }
    


})


const users=db.define('users',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    }

})


const addtocart=db.define('addtocart',{
    username:{
        type:sequelize.STRING
    },
    // id:{
    //     type:sequelize.STRING   
    // },
    name:{
        primaryKey:true,
        type:sequelize.STRING,
    },
    manufacturer:{
        type:sequelize.STRING,
    },
    price:{
        type:sequelize.FLOAT,
        allowNull:false,
        defaultValue:0.0,
    },
    type:{
        type:sequelize.STRING
    },
    Image:{
        type:sequelize.STRING
    },
    quantity:{
        type:sequelize.INTEGER,
        defaultValue:1
    },
    

})



db.sync().then(()=>{
    console.log('shop.db created')
})


module.exports={
    db,users,products,addtocart
}