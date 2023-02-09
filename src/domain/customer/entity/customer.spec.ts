import Customer from "./customer";
import Address from "../value-object/address";

describe("Customer unit itests",()=>{

    it("should throw error when id is empty",()=>{
        expect(()=>{
            let customer = new Customer("","John")
        }).toThrowError("Id is required")
    });

    it("should throw error when name is empty",()=>{
        expect(()=>{
            let customer = new Customer("123","")
        }).toThrowError("Name is required")
    })

    it("should change name",()=>{
        const customer = new Customer("123","Will")

        customer.changeName("John")

        expect(customer.name).toBe("John")
    })

    it("should activate customer", ()=> {
        const customer = new Customer("123","Will")
        const address = new Address("Street 1", 123, "1330-250", "São Paulo")
        customer.changeAddress(address)

        customer.activate();

        expect(customer.isActive()).toBe(true)      
    })

    it("should deactivate customer", ()=> {
        const customer = new Customer("123","Will")
        expect(customer.rewardsPoints).toBe(0)
        
        customer.addRewardsPoints(10)
        expect(customer.rewardsPoints).toBe(10)
        
        customer.addRewardsPoints(20)
        expect(customer.rewardsPoints).toBe(30)
    })

    it("should add reward points", ()=> {
        const customer = new Customer("123","Will")

        customer.deactivate();

        expect(customer.isActive()).toBe(false)      
    })

    it("should throw error when address is undefined when you activate a customer", ()=> {

        expect(()=>{
            const customer = new Customer("123","Will")
    
            customer.activate();
    
        }).toThrowError("Address is mandatory to activate a customer")
        
    })
})