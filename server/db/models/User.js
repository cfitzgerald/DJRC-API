const db = require('./db');
const Sequelize = db.Sequelize;
const bcrypt = require('bcrypt');

function saltPassword(user){
  return bcrypt.genSalt(10)
  .then(salt => {
    return bcrypt.hash(user.password, salt);
  })
  .then(hash => {
    user.password = hash;
  })
  .catch(err => console.log(err));
}

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: 'This email is already in use.'
    },
    validate: {
      notEmpty: {
        msg: 'Please provide an email.'
      },
      isEmail: {
        msg: 'Please provide a valid email.'
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Please enter a password.'
      }
    }
  },
  // passwordExpired: {
  //   type: Sequelize.BOOLEAN,
  //   defaultValue: false
  // },
  isBusiness: {
    type: Sequelize.BOOLEAN
  },
  vibe: {
    type: Sequelize.STRING
  },
  photo: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      return saltPassword(user);
    }
  }
});

User.findBySessionId = function(id){
  // if (!id){
  //   throw createError('No user found');
  // }
  return this.findById(id);
};

User.prototype.validatePassword = function(password) {
  return bcrypt.compare(password, this.password)
  .then(res => {
    if (!res){
      throw createError('Invalid credentials!');
    }
    return this;
  });
};

User.prototype.checkNewPasswords = function(newPassword, newPasswordCheck){
  if (newPassword === newPasswordCheck) {
    this.password = newPassword;
    this.passwordExpired = false;
    saltPassword(this);
    this.save();
    return this;
  } else {
    throw createError('New password fields do not match.');
  }
};

User.login = function(credentials){
  const { email, password } = credentials;
  if (!email || !password){
    throw createError('Please complete all fields.');
  }
  return User.findOne({
    where: {
      email
    }
  })
  .then( user => {
    return user.validatePassword(password);
  })
  .catch(err => console.log(err));
};

module.exports = User;
