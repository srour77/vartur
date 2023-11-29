import {FastifyInstance} from 'fastify'
import ProductHandler from '../handlers/product'
import { StatusCodes } from 'http-status-codes'
import {$ref} from '../schemas/product'
import {uploadProductPicture} from '../middlewares/try-upload'


async function ProductsRouter (server: FastifyInstance){
    server.get('/', {schema: {response: {[StatusCodes.OK]: $ref('getAllProductsResSchema')}}}, ProductHandler.getAllProducts)
    server.get('/:productId', {schema: {params: $ref('getSingleProductReqSchema'), response: {[StatusCodes.OK]: $ref('getSingleProductResSchema')}}}, ProductHandler.getSingleProduct)
    server.put('/:productId', {preHandler: [uploadProductPicture], schema: {params: $ref('updateProductReqParamsSchema'), response: {[StatusCodes.OK]: $ref('updateProductResSchema')}}}, ProductHandler.updateProduct)
    server.delete('/:productId', {schema: {params: $ref('deleteProductReqSchema')}}, ProductHandler.deleteProduct)
    server.post('/', {preHandler: [uploadProductPicture], schema: {response: {[StatusCodes.OK]: $ref('createProductResSchema')}}}, ProductHandler.createProduct)
    server.get('/category/:categoryId', {schema: {params: $ref('getAllProductsByCategoryIdReqSchema')}}, ProductHandler.getAllProductsByCategoryId)
}

export default ProductsRouter