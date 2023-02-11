import Address from "../value-object/address";

class Customer {
    

    private _id: string;
    private _name: string;
    private _address!: Address
    private _active: boolean = false;
    private _rewardsPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id
        this._name = name
        this.validate();
    }

    private validate() {
        if (this._id.length === 0)
            throw new Error("Id is required")
        if (this._name.length === 0)
            throw new Error("Name is required")
    }

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    changeName(name: string) {
        this._name = name
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardsPoints(points:number){
        this._rewardsPoints += points;
    }

    get rewardsPoints(): number{
        return this._rewardsPoints
    }

    get Address(){
        return this._address
    }

}

export default Customer