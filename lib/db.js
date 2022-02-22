const mongoose = require('mongoose')

module.exports.connect = async()=>{

    await mongoose.connect(process.env.MONGO_URL)
    console.log("connected to db!")  
      
}

module.exports.close = ()=>{
    mongoose.connection.close()
}
