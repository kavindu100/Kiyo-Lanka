const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log("Database error:", error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database synced');
});

const employeeRouter = require("./routes/employees.js");
const transportRouter = require("./routes/transports.js");

app.use("/employee", employeeRouter);
app.use("/transport", transportRouter);

app.route('/').get((req, res) => {
    res.send('FactoryManagement System API');
});

app.listen(PORT, () => {
    console.log(`server is up and running on PORT ${PORT}`);
});