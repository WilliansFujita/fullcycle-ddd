import Produto from "../../../domain/product/entity/product";
import RepositoryInterface from "../../repository/repository-interface";
import ProductModel from './sequelize/product.models'
export default class ProdutoRepository implements RepositoryInterface<Produto>{

    async create(entity: Produto): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
        return
    }
    update(entity: Produto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }

}