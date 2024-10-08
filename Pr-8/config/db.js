const mongoose = require('mongoose')
 const ConnectDb = async() => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/admin_penal')
        console.log(`mongodb connected = ${db.connection.host}`);
    } catch (error) {
        console.log(error);
    }
 }
 module.exports = ConnectDb