module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    usertype: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    twitter: {
      type: DataTypes.STRING
    },
    facebook: {
      type: DataTypes.STRING
    },
    instagram: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        User.belongsToMany(models.Event, {
          as: 'participants',
          through: 'EventParticipant'
        });
      }
    }
  });
  return User;
};
