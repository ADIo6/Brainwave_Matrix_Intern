// multer package acts as a middleware here. With the help of multer we can upload files in database

import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


const storage = new GridFsStorage({
    url:`mongodb://${username}:${password}@blog-app-shard-00-00.bhjlp.mongodb.net:27017,blog-app-shard-00-01.bhjlp.mongodb.net:27017,blog-app-shard-00-02.bhjlp.mongodb.net:27017/test?ssl=true&replicaSet=atlas-px96ok-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`,
    options: { useNewUrlParser: true },
    file: ( request, file ) =>{
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if(match.indexOf(file.mimetype) === -1){ //^^ file.memeType
            return `${Date.now()}-blog-${file.originalname}`;

        }
        return{ 
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }  
});


export default multer({ storage });