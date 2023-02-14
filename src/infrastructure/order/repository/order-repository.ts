import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
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
    return new Promise(async (resolve, reject) => {
      try {
        const order_finded = await OrderModel.findOne({
          where:{id},
          include: [{ model: OrderItemModel }],
        });
        
        resolve(new Order(order_finded.id, order_finded.customer_id, this.itemsConverter(order_finded.items)))
      } catch (error) {
        reject(error)
      }
    })
  }

  itemsConverter(items: OrderItemModel[]): OrderItem[] {
    return items.map(item=>new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity));
  }

  findAll(): Promise<Order[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await OrderModel.findAll({
          include: [{ model: OrderItemModel }],
        });
        const order_return = orders.map(order => new Order(order.id, order.customer_id, this.itemsConverter(order.items)))
        resolve(order_return)
      } catch (error) {
        reject(error)
      }
    })
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