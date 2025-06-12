export class Plat {
    constructor(id, name, description, price, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category; 
    }

    static fromJSON(json) {
        return new Plat(
            json.id,
            json.name,
            json.description,
            json.price,
            json.category
        );
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            category: this.category
        };
    }
}