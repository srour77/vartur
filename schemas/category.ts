import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
const category = z.object({
    id: z.number(),
    parent_category_id: z.number().nullable(),
    name: z.string(),
    picture: z.string().nullable(),
    created_at: z.date(),
    updated_at: z.date()
})

const getAllCategoriesReqSchema = z.object({}) 
const getAllCategoriesResSchema = z.array(category)

const updateCategoryReqSchema = z.object({categoryId: z.number()})
const updateCategoryReqBodySchema = z.object({
    parent_category_id: z.number().optional().nullable(),
    name: z.string().optional(),
    picture: z.string().optional().nullable()
})
const updateCategoryResSchema = category

const deleteCategoryReqSchema = updateCategoryReqSchema
const deleteCategoryResSchema = category

const getSingleCategoryReqSchema = updateCategoryReqSchema
const getSingleCategoryResSchema = category.nullable()

const createCategoryReqSchema = z.object({
    parent_category_id: z.number().optional().nullable(),
    name: z.string(),
    picture: z.string().optional().nullable()
})
const createCategoryResSchema = category

export const { schemas: categorySchemas, $ref } = buildJsonSchemas({
    getAllCategoriesReqSchema,
    getAllCategoriesResSchema,
    updateCategoryReqSchema,
    updateCategoryReqBodySchema,
    updateCategoryResSchema,
    deleteCategoryReqSchema,
    deleteCategoryResSchema,
    getSingleCategoryReqSchema,
    getSingleCategoryResSchema,
    createCategoryReqSchema,
    createCategoryResSchema
}, {$id: 'categorySchemas'});