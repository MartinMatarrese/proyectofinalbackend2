export default class ProductReqDto {
    constructor (product) {
        this.nombre = product.title;
        this.descripcion = product.description;
        this.precio = product.price;
        this.disponible = product.stock
    };
};