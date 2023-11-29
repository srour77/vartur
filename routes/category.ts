import {FastifyInstance} from 'fastify'
import CategoryHandler from '../handlers/catogory'
import {$ref} from '../schemas/category'
import { StatusCodes } from 'http-status-codes'
import {uploadCategoryPicture} from '../middlewares/try-upload'

async function categoriesRouter (server: FastifyInstance){
    server.post('/', {preHandler: [uploadCategoryPicture], schema: {response: {[StatusCodes.CREATED]: $ref('createCategoryResSchema')}}}, CategoryHandler.CreateCategory)
    server.get('/', {schema: {response: {[StatusCodes.OK]: $ref('getAllCategoriesResSchema')}}}, CategoryHandler.getAllCategories)
    server.get('/:categoryId', {schema: {params: $ref('getSingleCategoryReqSchema'), response: {[StatusCodes.OK]: $ref('getSingleCategoryResSchema')}}}, CategoryHandler.getSingleCategory)
    server.put('/:categoryId', {preHandler: [uploadCategoryPicture], schema: {params: $ref('updateCategoryReqSchema'), response: {[StatusCodes.OK]: $ref('updateCategoryResSchema')}}}, CategoryHandler.updateCategory)
    server.delete('/:categoryId', {schema: {params: $ref('deleteCategoryReqSchema')}}, CategoryHandler.deleteCategory)
}

export default categoriesRouter