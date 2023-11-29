import fastify from "fastify";
import ProductsRouter from './routes/product'
import categoriesRouter from './routes/category'
import {categorySchemas} from './schemas/category'
import {productSchemas} from './schemas/product'

const server = fastify();
server.register(require('@fastify/multipart'), {attachFieldsToBody: 'keyValues'})
for(const schema of categorySchemas) server.addSchema(schema);
for(const schema of productSchemas) server.addSchema(schema);

server.register(ProductsRouter, {prefix: '/api/v1/products'})
server.register(categoriesRouter, {prefix: '/api/v1/categories'})

server.setErrorHandler((err, req, res) => {console.log(err); res.status(500).send('something went wrong, pls try again')})


server.listen({port: Number(process.env.PORT), host: "localhost"}, _ => console.log('server is now running...'))