// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// module.exports = mongoose.model('User', new Schema({ 
//     firstName: String, 
//     lastName: String,
//     email: String,
//     password: String, 
//     admin: Boolean 
// }));


var Schema = require('jugglingdb').Schema;
var schema = new Schema('postgres', {
    host: 'ec2-54-228-213-35.eu-west-1.compute.amazonaws.com',
    database: 'dlgnkbqiumvpr',
    port: 5432,
    username: 'uercuqqgfibmym',
    password: 'XvVS2QPVGTm11QsBz1WRyZ_Otw',
    ssl: true,
    debug: false
});
//var schema = new Schema('postgres', { url: 'postgres://uercuqqgfibmym:XvVS2QPVGTm11QsBz1WRyZ_Otw@ec2-54-228-213-35.eu-west-1.compute.amazonaws.com:5432/dlgnkbqiumvpr?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory' });


schema.automigrate();

var User = schema.define('User', {
    firstName:  String,
    lastName:   String,
    bio:        Schema.Text,
    email:      String,
    password:   String, 
    admin:      Boolean,
    approved:   Boolean,
    joinedAt:   Date
}, {
    restPath: '/users' // tell WebService adapter which path use as API endpoint
});

module.exports = User;