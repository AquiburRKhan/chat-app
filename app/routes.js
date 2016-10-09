var User = require('./server.controller.js');


module.exports = function(app) {

    app.route('/api/createUser').post(User.signup);
    app.route('/api/loginUser').get(User.login);
    app.route('/api/getAllUsers').get(User.getAllUsers);
    app.route('/api/logoutUser').put(User.logout);
    app.route('/').get(User.loadIndex);

};
