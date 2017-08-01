var mongoose = require('mongoose');

//use mongoose module's method Schema
var Schema = mongoose.Schema;


//created user schema
var UserSchema = new Schema({
    
    username: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: true },    
    firstname: {type: String, required: true },
    lastname: {type: String, required: true },
    email: {type: String, lowercase: true, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    location: { type: String, required: true },
    message: { type: Array, "default" : []}
        
    
});


//export this into server file
module.exports
 = mongoose.model('User', UserSchema);