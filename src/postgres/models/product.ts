import { Model, DataTypes } from "sequelize";

export const ProductFactory = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })

  Product.associate = (models) => {
    Product.belongsToMany(models.CartItem, { through: "CardItemProduct" });
  };

  return Product;
};
