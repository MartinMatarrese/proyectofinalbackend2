export default class ProductResDto {
    constructor(product){
        this.id = product._id;
        this.title = product.title;
        this.price = product.price;
        this.stock = product.stock;
    };
};