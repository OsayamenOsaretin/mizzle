module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Event.belongsToMany(models.User, {
          through: 'EventParticipants'
        });
        Event.belongsToMany(models.Artiste, {
          through: 'EventArtiste'
        });
      }
    }
  });
  return Event;
};
