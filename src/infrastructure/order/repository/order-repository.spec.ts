import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import Produto from "../../../domain/product/entity/product";
import CustomerRepository from "../../customer/repository/customer-repository";
import ProductRepository from "../../product/repository/product-repository";
import CustomerModel from "../../customer/repository/sequelize/customer.models";
import OrderItemModel from "./sequilize/order-item.models";
import OrderModel from "./sequilize/order.models";
import OrderItem from "../../../domain/checkout/entity/order_item";
import Order from "../../../domain/checkout/entity/order";
import OrderRepository from "./order-repository";
import ProductModel from "../../product/repository/sequelize/product.models";
describe("Product repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([OrderModel, OrderItemModel,CustomerModel,ProductModel])
        await sequelize.sync();
    })

    afterEach(async ()=>{
        await sequelize.close();
    })

    it("should create a new order",async ()=>{
        const customerRepository = new CustomerRepository();
        const customer = new Customer('c1','Customer 1');
        const address = new Address('rua 1',1,'80000','maringa')
        customer.changeAddress(address)
        
        await customerRepository.create(customer)

        const productRepositoy = new ProductRepository()
        const product = new Produto('p1','Produto 1',100)
        await productRepositoy.create(product)

        const item = new OrderItem('i1','item 1',product.price,product.id,2)
        const ordem = new Order('o1',customer.id,[item])

        const orderRepository = new OrderRepository()
        await orderRepository.create(ordem)

        const orderModel = await OrderModel.findOne({where:{id:'o1'},include:[OrderItemModel]})

        expect(orderModel.toJSON()).toStrictEqual({
            id: "o1",
            customer_id: "c1",
            total: ordem.total(),
            items: [
              {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                order_id: "o1",
                product_id: "p1",
              },
            ],
          });
    })
})