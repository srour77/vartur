import { StatusCodes } from "http-status-codes"
import { Readable } from "stream";

const uploadProductPicture = async function(req, res, next) {
    try{
        const {category_id, picture} = req.body
        if(category_id) req.body.category_id = Number(category_id)
        if(picture) await uploadStream(req)
        next()
    }
    catch(e) {
        console.log(e);
        res.status(StatusCodes.BAD_REQUEST).send('invalid data or data type, category_id(number), name(string) and picture(file image) expected')
    }
}

const uploadCategoryPicture = async function(req, res, next) {
    try{
        const {parent_category_id, picture} = req.body
        if(parent_category_id) req.body.parent_category_id = Number(parent_category_id);
        if(picture) await uploadStream(req)
        next()
    }
    catch(e) {
        console.log(e);
        res.status(StatusCodes.BAD_REQUEST).send('invalid data or data type, category_id(number), name(string) and picture(file image) expected')
    }
}

const uploadStream = function (req) {
    return new Promise((resolve, reject) => {
        const cloudinary = require('cloudinary').v2
        cloudinary.config({ 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.CLOUD_API_KEY, 
            api_secret: process.env.CLOUD_API_SECRET
        });
        const writeStream = cloudinary.uploader.upload_stream({ folder: "products images" }, (err, result) => {
            if (err) reject(err);
            else {
                req.body.picture = result.url
                resolve(result);
            }
        });
    
        const readStream = new Readable({read() {this.push(req.body.picture);this.push(null);}});
    
        readStream.pipe(writeStream);
    });
};

export {uploadProductPicture, uploadCategoryPicture}