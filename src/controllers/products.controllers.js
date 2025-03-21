import { productService } from "../services/product.service.js";
import Controllers from "./controller.manager.js";

class ProductController extends Controllers {
    constructor() {
        super(productService);
    };

    getProducts = async (req, res, next) => {
            try {
                const {limit, page, filter, metFilter, ord} = req.query
                const pag = page !== undefined ? page : 1
                const lim = limit !== undefined ? limit : 10
                const query = metFilter !== undefined ? {[metFilter] : filter} : {}
                const onQuery = ord !== undefined ? {price: ord} : {}
                const prods = await this.service.getAll(query, {limit: lim, page: pag, sort: onQuery})
                res.status(200).send(prods)
            }catch(error){
                next(error)
            }
        }
        getProduct = async (req, res, next) => {
            try {
                const { id } = req.params
                const prod = await this.service.getProduct(id);
                if(prod) {
                    res.status(200).json(prod);
                } else {
                    res.status(404).json({error: "El producto no existe"});
                }
            }catch(error){
                next(error)
            }
        }
        
        createProduct = async (req, res, next) => {
            try {
                const product = req.body
                await this.service.create(product)
                res.status(201).json({message: "Producto creado correctamente"});
            }catch(error){
                next(error);
            };
        };
        
        updateProduct = async (req, res, next) => {
            try {
                const { id } = req.params
                const updateProduct = req.body
                await this.service.update(id, updateProduct);
                res.status(200).json({message: "Producto actualizado correctamente" });
            } catch(error){
                next(error);
            };
        };
        
        deleteProduct = async (req, res, next) => {
            try {
                const { id } = req.params
                await this.service.delete(id)
                res.status(200).json({message: "Producto eliminado correctamente" });
            }catch(error){
                next(error);
            };
        };
};

export const productController = new ProductController();