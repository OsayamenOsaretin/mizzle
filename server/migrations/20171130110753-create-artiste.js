module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.createTable('Artistes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  ),
  down: queryInterface => (
    queryInterface.dropTable('Artistes')
  )
};
