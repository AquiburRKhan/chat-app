var User = require('./models/user');
var crypto = require('crypto');

function generateToken(cb) {
    crypto.randomBytes(64, cb);
}

exports.loadIndex = function(req, res) {
    res.sendFile('./public/index.html');
};

exports.signup = function(req, res) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) {
            return res.send(err);
        }
        res.json(user);
    });
};

exports.login = function(req, res) {
    var user = new User(req.query);
    User.findOne({
        username: user.username,
        password: user.password
    }, function(err, user) {
        if (err) {
            return res.send(err);
        } else if (user != null) {
            generateToken(function(err, token) {
                if (err) {
                    cb(err);
                    return;
                }
                token = token.toString('base64');
                // update login status and token of user
                User.findOneAndUpdate({
                        username: user.username
                    }, {
                        loginStatus: 'true',
                        token: token
                    }, {
                        new: true
                    },
                    function(err, user) {
                        if (err) {
                            return res.send(err);
                        }
                        res.json(user);
                    });
            });
        }
       else{
        res.json(user);
        }
    })
};

exports.getAllUsers = function(req, res) {
    User.find({}, "username loginStatus", function(err, users) {
        if (err) {
            return res.send(err);
        }
        res.json(users);
    });
};

exports.logout = function(req, res) {
    var user = new User(req.body);
    User.findOneAndUpdate({
        username: user.username
    }, {
        loginStatus: 'false',
        token: ""
    }, {
        new: true
    }, function(err, user) {
        if (err) {
            return res.send(err);
        }
        res.json(user);
    });

};
