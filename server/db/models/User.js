const db = require('./db');
const Sequelize = db.Sequelize;
const bcrypt = require('bcrypt');

const createError = (message) => {
    const error = new Error(message);
    error.status = 401;
    return error;
};

const saltPassword = (user) => {
    if (!user.password) return;
    return bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(user.password, salt);
        })
        .then(hash => {
            user.password = hash;
        })
        .catch(err => console.log(err));
};

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING,
        // allowNull: false,
        // validate: {
        //   notEmpty: {
        //     msg: 'Please provide a first name.'
        //   }
        // }
    },
    lastName: {
        type: Sequelize.STRING,
        // allowNull: false,
        // validate: {
        //   notEmpty: {
        //     msg: 'Please provide a last name.'
        //   }
        // }
    },
    address: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        // allowNull: false,
        // unique: {
        //   msg: 'This email is already in use.'
        // },
        // validate: {
        //   notEmpty: {
        //     msg: 'Please provide an email.'
        //   },
        //   isEmail: {
        //     msg: 'Please provide a valid email.'
        //   }
        // }
    },
    password: {
        type: Sequelize.STRING,
        // allowNull: false,
        // validate: {
        //   notEmpty: {
        //     msg: 'Please enter a password.'
        //   }
        // }
    },
    // passwordExpired: {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false
    // },
    isBusiness: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    vibe: {
        type: Sequelize.STRING
    },
    photo: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    spotifyId: {
        type: Sequelize.STRING
    },
    spotifyAccessToken: {
        type: Sequelize.STRING
    },
    spotifyRefreshToken: {
        type: Sequelize.STRING
    }
}, {
    getterMethods: {
        fullName: function() {
            return this.firstName + '' + this.lastName;
        }
    },
    setterMethods: {
        fullName: function(fullname) {
            var split = fullname.split('');
            this.firstName = split[0];
            this.lastName = split[1];
        }
    }
});

User.beforeCreate(saltPassword);

User.findBySessionId = function(id) {
    // if (!id){
    //   throw createError('No user found');
    // }
    return this.findById(id);
};

User.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password)
        .then(res => {
            if (!res) {
                throw createError('Invalid credentials!');
            }
            return this;
        });
};

User.prototype.checkNewPasswords = function(newPassword, newPasswordCheck) {
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

User.login = function(credentials) {
    const { email, password } = credentials;
    if (!email || !password) {
        throw createError('Please complete all fields.');
    }
    return User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            return user.validatePassword(password);
        })
        .catch(err => console.log(err));
};

module.exports = User;
