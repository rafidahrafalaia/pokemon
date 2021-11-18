"use strict";
module.exports = (sequelize, Sequelize) => {
  const pokemon = sequelize.define(
    "pokemon",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      pokemon_id: {
        type: Sequelize.INTEGER(50),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      nickname: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      abilities: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      types: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      weight: {
        type: Sequelize.INTEGER(50),
        allowNull: false,
      },
      height: {
        type: Sequelize.INTEGER(50),
        allowNull: false,
      },
      rename: {
        type: Sequelize.INTEGER(50),
        defaultValue: 0,
      },
      date: {
        type: Sequelize.DATE,
        default:new Date(),
      },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
      indexes: [
      ],
    }
  );

  return pokemon;
};
