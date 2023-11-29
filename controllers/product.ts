import { product } from "../types/index";
import dbClient from "../db/client";
import CategoryController from "./category";

class Product {
  static async getAllProducts(): Promise<product[]> {
    const allProducts = await dbClient.product.findMany();
    return allProducts;
  }

  static async getProductById(productId: number): Promise<product | null> {
    const product = await dbClient.product.findFirst({where: { id: productId }});
    return product;
  }

  static async deleteProduct(productId: number): Promise<boolean> {
    await dbClient.product.delete({ where: { id: productId } });
    return true;
  }

  static async createProduct(toBeCreatedProduct: {'name': string, 'category_id': number | null, 'picture': string | null}): Promise<product> {
    const newProduct = await dbClient.product.create({data: toBeCreatedProduct});
    return newProduct;
  }

  static async updateProduct(productId: number, product: Partial<product>): Promise<product> {
    const updatedProduct = await dbClient.product.update({where: {id: productId}, data: product})
    return updatedProduct
  }

  static async getAllProductsByCategoryId(category_id: number): Promise<product[]> {
    const parentCategoryId = (await dbClient.category.findFirst({where: {parent_category_id: category_id}}))?.id || -1
    const products = await dbClient.product.findMany({where: {category_id : {in: [category_id, parentCategoryId]}}})
    return products
  }
}

export default Product;