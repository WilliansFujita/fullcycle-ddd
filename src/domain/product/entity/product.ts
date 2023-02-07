export default class Produto {
    
    
    private _id: string;
    private _name: string;
    private _price: Number;



    constructor(id: string, name: string, price: Number) {
        this._id = id;
        this._name = name;
        this._price = price
        this.validate()
    }

    private validate() {
        if (this._id.length == 0)
            throw new Error("Id is required");

        if (this._name.length == 0)
            throw new Error("Name is required");

        if (this._price < 0)
            throw new Error("Price must be grater than zero");
    }

    changeName(name: string) {
        this._name = name
        this.validate();
    }

    get name(){
        return this._name
    }

    changePrice(price: number) {
        this._price = price
        this.validate()
    }

    get price(){
        return this._price
    }
}