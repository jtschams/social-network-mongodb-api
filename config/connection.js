const { connect, connection } = require('mongoose');
// TODO
connect('mongodb://127.0.0.1:27017/renamethis');

module.exports = connection;
