export type ORDER_STATUS = "created" | "completed";

import { Model, DataTypes } from "sequelize";

export const OrderFactory = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cartId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    items: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delivery: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comments: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.hasMany(models.CartItem, { foreignKey: "cartId" });
  };

  return Order;
};
