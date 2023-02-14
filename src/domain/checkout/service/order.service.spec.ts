import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service"

describe("Order service unit tests", ()=>{


    it("should place an order",()=>{
        const customer = new Customer("c1","Nome")
        const item1 = new OrderItem('i1',"item 1",10,"p1",1);

        const order = OrderService.placeOrder(customer,[item1])

        expect(customer.rewardsPoints).toBe(5);
        expect(order.total()).toBe(10)
    })
    
    it("should get total of all orders",()=>{
        const item1 = new OrderItem('i1',"Item 1", 100, "p1",1)
        const item2 = new OrderItem('i2',"Item 2", 200, "p1",3)
        const ordem1 = new Order('o1','cli1',[item1])
        const ordem2 = new Order('o2','cli1',[item2])

        const total = OrderService.total([ordem1,ordem2])

        expect(total).toBe(ordem1.total()+ordem2.total())
    })
})