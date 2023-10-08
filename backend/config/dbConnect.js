const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const db = mongoose.connect(process.env.MONGO_CONNECTION_URL,{useNewUrlParser:true},{useUnifiedTopology:true})
.then((data)=>{
    console.log(`Db connected successfully`)
}).catch((err)=>{
    console.log(`error ${err}`);
}
)

module.exports = db