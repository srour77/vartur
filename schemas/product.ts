import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

const product = z.object({
    id: z.number(),
    name: z.string(),
    picture: z.string().nullable(),
    category_id: z.number().nullable(),
    created_at: z.date(),
    updated_at: z.date()
})

const getAllProductsReqSchema = z.object({})
const getAllProductsResSchema = z.array(product)

const getSingleProductReqSchema = z.object({productId: z.number()})
const getSingleProductResSchema = product.nullable()

const updateProductReqParamsSchema = getSingleProductReqSchema
const updateProductReqBodySchema = z.object({
    name: z.string().min(1).optional(),
    picture: z.string().nullish(),
    category_id: z.number().nullish()
})
const updateProductResSchema = product

const createProductReqSchema = z.object({
    name: z.string().min(1),
    picture: z.array(z.number()),
    category_id: z.number().nullish()
})
const createProductResSchema = product

const deleteProductReqSchema = getSingleProductReqSchema

const getAllProductsByCategoryIdReqSchema = z.object({categoryId: z.number()})

export const { schemas: productSchemas, $ref } = buildJsonSchemas({
    getAllProductsReqSchema,
    getAllProductsResSchema,
    getSingleProductReqSchema,
    getSingleProductResSchema,
    updateProductReqParamsSchema,
    updateProductReqBodySchema,
    updateProductResSchema,
    createProductReqSchema,
    createProductResSchema,
    deleteProductReqSchema,
    getAllProductsByCategoryIdReqSchema
}, {$id: 'productSchemas'});