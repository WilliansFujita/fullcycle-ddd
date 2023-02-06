

class Address{
    private _street: string;
    private _number: Number;
    private _zip_code: string;
    private _city : string;

    constructor(street:string, number: Number, zip_code: string, city: string){
        this._street = street;
        this._number = number;
        this._zip_code = zip_code;
        this._city = city
        this.validate();
    }

    private validate(){

    };
}

export default Address