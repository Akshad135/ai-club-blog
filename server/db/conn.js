const mongoose = require("mongoose");

const DB = "mongodb+srv://akshatsrivastav38:ZMWYL22RDNiWvTSs@cluster0.vzatsel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("database connected")).catch((err)=>console.log("errr",err))