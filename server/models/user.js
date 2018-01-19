const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'First Name is required!'
        }
      }
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Last Name is required!'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email is required!'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password length should range between 6 - 100 characters!'
        },
        notEmpty: {
          msg: 'Password is required!'
        }
      }
    },
    roleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
        User.hasMany(models.Note, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  User.beforeCreate((user) => {
    user.email = user.email.toLowerCase();
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  });
  User.beforeBulkUpdate((user) => {
    if (user.attributes.email) {
      user.attributes.email = user.attributes.email.toLowerCase();
    }
    if (user.attributes.password !== null) {
      user.attributes.password = bcrypt.hashSync(user.attributes.password, bcrypt.genSaltSync(10));
    }
  });
  return User;
};