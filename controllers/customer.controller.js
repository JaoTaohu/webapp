const customer = require('../models/customer.js')

exports.index = (req, res) => {
    res.send('<h1>Customer Application</h1><hr><a href="/api/customer">ikp=njv]^d8hk</a>')
}

exports.create = (req, res) => {
    const c = new customer(req.body)

    c.save().then(data => {
        res.json(data)
    }).catch(err => {
        return res.status(500).jso({
            msg: "ไม่สามารถเพิ่มข้อมูลได้เนื่องจาก : " + err.message
        })
    })
}


exports.findAll = (req, res) => {
    customer.find().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        })
    })
}

exports.findById = (req, res) => {
    customer.findById(req.params.customerId).then(data=>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ record รหัส : " + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "เกิดข้อผิดพลาดเนื่องจาก : " + err.message
        })
    })
}

exports.update = (req, res) => {
    customer.findByIdAndUpdate(req.params.customerId, {$set: req.body}, {new: true})
    .then(data => {
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ record รหัส : " + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถ update ข้อมูลได้เนื่องจาก : " + err.message
        })
    })
}



exports.delete = (req, res) => {
    customer.findByIdAndDelete(req.params.customerId)
    .then(data => {
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ record รหัส : " + req.params.customerId
            })
        }
        res.json({ msg: "ลบข้อมูลแล้ว"})
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถลบข้อมูลได้ เนื่องจาก : " + err.message
        })
    })
}