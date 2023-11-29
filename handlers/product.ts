import { FastifyRequest, FastifyReply } from "fastify"
import Product from '../controllers/product'
import { product } from "../types"
import {StatusCodes} from 'http-status-codes'

export default class ProductHandler {
    static async getAllProducts(req: FastifyRequest, res: FastifyReply) {
        const products = await Product.getAllProducts()
        res.status(StatusCodes.OK).send(products)
    }

    static async getSingleProduct(req: FastifyRequest<{Params: {productId: number}}>, res: FastifyReply) {
        const product = await Product.getProductById(req.params.productId)
        res.status(StatusCodes.OK).send(product)
    }

    static async createProduct(req: FastifyRequest<{Body: {'name': string, 'picture': string | null, 'category_id': number | null}}>, res: FastifyReply) {
        console.log(req.body);
        const newProduct = await Product.createProduct(req.body);
        res.status(StatusCodes.CREATED).send(newProduct);
    }

    static async updateProduct(req: FastifyRequest<{Params: {productId: number}, Body: Partial<product>}>, res: FastifyReply) {
        if(!await Product.getProductById(req.params.productId)) res.status(StatusCodes.BAD_REQUEST).send('no such product with this id')
        const updatedProduct = await Product.updateProduct(req.params.productId, req.body)
        res.status(StatusCodes.OK).send(updatedProduct)
    }

    static async deleteProduct(req: FastifyRequest<{Params: {productId: number}}>, res: FastifyReply) {
        if(!await Product.getProductById(req.params.productId)) res.status(StatusCodes.BAD_REQUEST).send('no such product with this id')
        await Product.deleteProduct(req.params.productId)
        res.status(StatusCodes.OK).send('product deleted')
    }

    static async getAllProductsByCategoryId(req: FastifyRequest<{Params: {categoryId: number}}>, res: FastifyReply) {
        console.log(req.params.categoryId);
        const products = await Product.getAllProductsByCategoryId(req.params.categoryId)
        res.status(StatusCodes.OK).send(products)
    }
}