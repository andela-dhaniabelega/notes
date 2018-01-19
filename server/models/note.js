'use strict';
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define('Note', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt: {
          msg: 'User role id must be integer'
        }
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isInt:{
          msg:'User id must be integer'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Note.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Note;
};