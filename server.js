const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const routes = require("./Routes/todoRoutes");

const app = express();
const PORT = process.env.PORT || 5000 ;

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB connected..."))
.catch((err)=> console.log(err));

app.use("/api", routes);

app.listen(PORT, ()=> console.log(`listening at ${PORT}...`));