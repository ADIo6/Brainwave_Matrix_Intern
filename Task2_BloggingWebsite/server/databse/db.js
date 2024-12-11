import mongoose from "mongoose";




 const Connection = async (username, password) => {
    const URL =`mongodb://${username}:${password}@blog-app-shard-00-00.bhjlp.mongodb.net:27017,blog-app-shard-00-01.bhjlp.mongodb.net:27017,blog-app-shard-00-02.bhjlp.mongodb.net:27017/test?ssl=true&replicaSet=atlas-px96ok-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;
    
    
    try {
       await mongoose.connect(URL, { useNewUrlParser: true });
       console.log('Database connected successfully');
    } 
    catch (error) {
        console.log('Error while connecting with the database', error);
        
    }
}

export default Connection;