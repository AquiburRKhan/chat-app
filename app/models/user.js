var mongoose = require('mongoose');

var userSchema = {
	username: {
		type: String,
		default: '',
		trim: true
	},
	password: {
		type: String,
		default: '',
		trim: true
	},
  token: {
    type: String,
    default: '',
    trim: true
  },
	loginStatus: {
		type: String,
		default: 'false',
		trim: true
	}
};

module.exports = mongoose.model('user',userSchema);
