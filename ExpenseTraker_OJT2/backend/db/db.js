const mongoos = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoos.connect('mongodb://0.0.0.0:27017/expv2')
            console.log("Connected!!!")
    } catch (error) {
        console.log("Not Connected!!")
    }
}
module.exports = connectDB