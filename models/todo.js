var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var TodoSchema = new Schema({
    note: String,
    
});

module.exports = mongoose.model('Todo', TodoSchema);
