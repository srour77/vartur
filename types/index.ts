export type product = {
    id: number,
    name: string,
    picture: string | null,
    category_id: number | null,
    created_at: Date,
    updated_at: Date
}

export type category = {
    id: number,
    parent_category_id: number | null,
    name: string ,
    picture: string | null,
    created_at: Date,
    updated_at: Date
}

export type getCategoryReq = Pick<category, 'id'>
export type getCategoryRes = category

export type createCategoryReq = Pick<category, 'name' | 'picture' | 'created_at'>
export type createCategoryRes = category