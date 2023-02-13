import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Order from "../../../domain/checkout/entity/order";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./sequilize/order-item.models";
import OrderModel from "./sequilize/order.models";

export default class OrderRepository implements OrderRepositoryInterface {



  async update(entity: Order): Promise<void> {

    const transaction = await OrderModel.sequelize.transaction()

    try {

      await OrderModel.update({
        customer_id: entity.customerId,
        total: entity.total()
      }, { where: { id: entity.id }, transaction })


      OrderItemModel.destroy({ where: { order_id: entity.id }, transaction })

      await Promise.all(entity.items.map((item) => {
        return OrderItemModel.create({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id
        }, { transaction })
      }))

      return await transaction.commit()

    } catch (error) {
      await transaction.rollback()
    }

  }


  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}