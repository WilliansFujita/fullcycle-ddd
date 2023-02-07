import Product from "./product";

describe("Customer unit itests",()=>{

    it("should throw error when id is empty",()=>{
        expect(()=>{
            let product = new Product("","Produto 1", 100)
        }).toThrowError("Id is required")
    });

    it("should throw error when name is empty",()=>{
        expect(()=>{
            let product = new Product("1","",100)
        }).toThrowError("Name is required")
    })

    it("should throw error when price is less than zero",()=>{
        expect(()=>{
            let product = new Product("1","Produto 2",-1)
        }).toThrowError("Price must be grater than zero")
    })

    it("should change name",()=>{

        let product = new Product("1","Produto 2",3)
        product.changeName("Produto 3")
        expect(product.name).toBe("Produto 3")
    })

    it("should change price",()=>{

        let product = new Product("1","Produto 2",3)
        product.changePrice(5)
        expect(product.price).toBe(5)
    })
})