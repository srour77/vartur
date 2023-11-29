import {FastifyRequest, FastifyReply} from 'fastify'
import { category } from '../types'
import CategoryController from '../controllers/category'
import { StatusCodes } from 'http-status-codes'

export default class CategoryHandler{
    static async getAllCategories(req: FastifyRequest, res: FastifyReply){
        const categories = await CategoryController.getAllCategories()
        res.status(StatusCodes.OK).send(categories)
    }

    static async getSingleCategory(req: FastifyRequest<{Params: {categoryId: number}}>, res: FastifyReply) {
        const singleCategory = await CategoryController.getCategoryById(req.params.categoryId)
        res.status(StatusCodes.OK).send(singleCategory)
    }

    static async CreateCategory(req: FastifyRequest<{Body: Pick<category, 'name'> & {'picture': string | null, 'parent_category_id': number | null}}>, res: FastifyReply) {
        const newCategory = await CategoryController.createCategory(req.body)
        res.status(StatusCodes.CREATED).send(newCategory)
    }

    static async updateCategory(req: FastifyRequest<{Params: {categoryId: number}, Body: Partial<category>}>, res: FastifyReply) {
        if(!await CategoryController.getCategoryById(req.params.categoryId)) res.status(StatusCodes.BAD_REQUEST).send('no such category with this id')
        const updatedCategory = await CategoryController.updateCategory(req.params.categoryId, req.body)
        res.status(StatusCodes.OK).send(updatedCategory)
    }

    static async deleteCategory(req: FastifyRequest<{Params: {categoryId: number}}>, res: FastifyReply) {
        if(!await CategoryController.getCategoryById(req.params.categoryId)) res.status(StatusCodes.BAD_REQUEST).send('no such category with this id')
        await CategoryController.deleteCategory(req.params.categoryId)
        res.status(StatusCodes.OK).send('category deleted successfully')
    }
}