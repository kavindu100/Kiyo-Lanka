const router = require("express").Router();
let Transport = require("../models/Transport");

router.route("/add").post((req,res)=>{
    const vid = req.body.vid;
    const name = req.body.name;
    const date= req.body.date;
    const licence_no = req.body.licence_no;
    const vehicle_no = req.body.vehicle_no;
    const month = req.body.month;
    const time = req.body.time;

    const newTransport = new Transport({
        vid,
        name,
        date,
        licence_no,
        vehicle_no,
        month,
        time
    })

    newTransport.save().then(()=>{
        res.json("Transport Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Transport.find().then((transports)=>{
        res.json(transports)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {vid, name, date, licence_no, vehicle_no, month, time} = req.body;

    const updateTransport = {
        vid, 
        name, 
        date, 
        licence_no, 
        vehicle_no, 
        month,  
        time
    }

    const update = await Transport.findByIdAndUpdate(userId, updateTransport).then(()=>{
        res.status(200).send({status: "User updated"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

router.route("/delete/:id").delete(async(req, res)=>{
    let userId = req.params.id;
    await Transport.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "user deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting user", error: err.message});
    })
})

router.route("/get/:id").get(async(req, res)=>{
    let userId = req.params.id;
    const user = await Transport.findById(userId).then(()=>{
        res.status(200).send({status: "User fetched", Transport})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting user"});
    })
})

module.exports = router;

