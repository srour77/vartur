## postman collection link
    https://www.postman.com/orbital-module-geologist-49437711/workspace/public-workspace/collection/25071677-a30a7b7b-85ef-4089-91a9-2c46f5f1e506

## how to run
    - make sure to have a mysql process up and running
    - modify the mysql connection string in the .env file
    - npm install (install required packages)
    - npm run migrate (build myql schema)
    - npm start (start fastify server)


## packages & frameworks Used
    - backend server: fastify
    - database: mysql
    - database orm: prisma
    - requests validator: zod, fastify-zod
    - file uploading: @fastify/multipart, stream
    - file cloud service: cloudinary
    - status codes wrapper: http-status-codes

## Rest Apis
    - base url: /api/v1
# products
    - sub url: /products

    - get all products, path: /, method: get, response: product[]

    - get all products by category id, path: /category/:categoryId, method: get, reponse: product[]

    - get single product, path: /:productId, method: get, response: product

    - create product, path: /, method: post, body: product, response: product

    - update product, path: /:productId, body: product, method: put, response: product

    - delete product, path: /productId, method: delete, response: string

# categories
    - sub url: /categories

    - get all categories, path: /, method: get, response: category[]

    - get single category, path: /:categoryId, method: get, response: category

    - create category, path: /, method: post, body: category, response: category

    - update category, path: /:categoryId, body: category, method: put, response: category

    - delete category, path: /categoryId, method: delete, response: string
