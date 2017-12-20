module.exports = (sequelize, DataTypes) => {
  const Artiste = sequelize.define('Artiste', {
    nickname: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Artiste.belongsTo(models.User);
        Artiste.belongsToMany(models.Event, {
          through: 'EventArtiste'
        });
      }
    }
  });
  return Artiste;
};
