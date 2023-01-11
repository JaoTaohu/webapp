const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config.js')
const Customer = require('./models/customer.js')

const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
    .then(()=>{
        console.log("connect to mongodb!")
    }).catch(err=>{
        console.log('Cannt Connect to MongoDB')
        process.exit();
    })

app.use(cors())
require('./routes/customer.route.js')(app);

const server = app.listen(process.env.PORT || 3000, ()=>{
    console.log('Run')
})

function initCustomer(){
    let data = [
        {
            CustomerId: 1001,
            Fullname: "Krisada",
            Address: "Nonthaburi"
        },
        {
            CustomerId: 1002,
            Fullanme: "Prem",
            Address: "Bangkok"
        },
        {
            CustomerId: 1003,
            Fullname: "Aom",
            Address: "Samutprakan"
        }
    ]
    for(let i=0; i<data.length; i++){
        const c =new Customer(data[i]);
        c.save()
    }
    console.log("สร้างข้อมูล Customer สำเร็จแล้ว")
}

