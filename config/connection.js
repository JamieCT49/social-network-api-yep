const { connect, connection } = require('mongoose');
// Puts Mongoose on local connection
const connectionString = 'mongodb://127.0.0.1:27017/socialDB';
connect(connectionString);
module.exports = connection;