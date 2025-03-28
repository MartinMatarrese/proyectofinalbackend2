export default class ProductResDto {
    constructor(product){
        this.nombre = product.title;
        this.precio = product.price;
        this.disponible = product.stock;
    };
};