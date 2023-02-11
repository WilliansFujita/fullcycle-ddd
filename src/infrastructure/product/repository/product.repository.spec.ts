import { Sequelize } from "sequelize-typescript";
import Produto from "../../../domain/product/entity/product";
import ProdutoRepository from "./product-repository.interface";
import ProductModel from './sequelize/product.models'
describe("Product repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        sequelize.addModels([ProductModel])
        await sequelize.sync();
    })

    afterEach(async ()=>{
        await sequelize.close();
    })

    it("should create a product",async ()=>{
        const productRepositoy = new ProdutoRepository();
        const product = new Produto("p1","Produto 1",100)

        await productRepositoy.create(product)
        const productModel  = await ProductModel.findOne({where: {id: "p1"}})

        expect(productModel.toJSON()).toStrictEqual({
            id:'p1',
            name:'Produto 1',
            price: 100
        })
        
    })
})