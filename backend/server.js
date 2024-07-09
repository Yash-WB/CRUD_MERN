const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const formRoutes = require("./routes/formRoutes");
const uploadRoute = require('./routes/uploadRoute');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("Mongodb connected."))
    .catch((err)=> console.log(err));

app.use('/api/form', formRoutes);
app.use('/api/file', uploadRoute);

const PORT = 4000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`))