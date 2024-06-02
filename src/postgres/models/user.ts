export const UserFactory = (sequelize, DataTypes) =>
  sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
  });
