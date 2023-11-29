import { category } from "../types/index";
import dbClient from "../db/client";

class CategoryController {
  static async getAllCategories(): Promise<category[]> {
    const allCategories = await dbClient.category.findMany();
    return allCategories;
  }

  static async getCategoryById(categoryId: number): Promise<category | null> {
    console.log(categoryId);
    
    const category = await dbClient.category.findFirst({where: { id: categoryId }});
    console.log(category);
    return category;
  }

  static async deleteCategory(categoryId: number): Promise<boolean> {
    await dbClient.category.delete({ where: { id: categoryId } });
    return true;
  }

  static async createCategory(toBeCreatedCategory: Pick<category, 'name'> & {'picture': string | null, 'parent_category_id': number | null}): Promise<category> {
    const newCategory = await dbClient.category.create({data: toBeCreatedCategory});
    return newCategory;
  }

  static async updateCategory(categoryId: number, category: Partial<category>): Promise<category> {
    console.log(category);
    
    const updatedCategory = await dbClient.category.update({where: {id: categoryId}, data: category})
    console.log(updatedCategory)
    return updatedCategory
  }
}

export default CategoryController;