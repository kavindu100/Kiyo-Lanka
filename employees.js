const router = require("express").Router();
let Employee = require("../models/Employee");

router.route("/add").post((req,res)=>{
    const eid = req.body.eid;
    const name = req.body.name;
    const gender = req.body.gender;
    const date_joined = req.body.date_joined;
    const dob = req.body.dob;
    const contact = req.body.contact;
    const address = req.body.address;

    const newEmployee = new Employee({
        eid,
        name,
        gender,
        date_joined,
        dob,
        contact,
        address
    })

    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {eid, name, gender, date_joined, dob, contact, address} = req.body;

    const updateEmployee = {
        eid, 
        name, 
        gender, 
        date_joined, 
        dob, 
        contact, 
        address
    }

    const update = await Employee.findByIdAndUpdate(userId, updateEmployee).then(()=>{
        res.status(200).send({status: "User updated"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

router.route("/delete/:id").delete(async(req, res)=>{
    let userId = req.params.id;
    await Employee.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting user", error: err.message});
    })
})

router.route("/get/:id").get(async(req, res)=>{
    let userId = req.params.id;
    const user = await Employee.findById(userId).then(()=>{
        res.status(200).send({status: "User fetched", Employee})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with getting user"});
    })
})

module.exports = router;

