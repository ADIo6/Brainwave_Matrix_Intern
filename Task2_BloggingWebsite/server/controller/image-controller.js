import grid from 'gridfs-stream';
import mongoose from 'mongoose';



// const url = 'http://localhost:8000'; // development phase
const url = process.env.BASE_URL || 'http://localhost:8000';


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', ()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
})

export const uploadImage = (request, response) =>{
    if(!request.file){
        return response.status(404).json({ msg: "File not found "});

    }
    // const imageUrl = `${url}/file/${request.file.filename}`;
    // return response.status(200).json(imageUrl);
    const imageUrl = `https://blogsphere-o93q.onrender.com/file/${request.file.filename}`;
    return response.status(200).json(imageUrl);

}

export const getImage = async (request, response) => {
    try {
        // Attempt to find the file in GridFS
        const file = await gfs.files.findOne({ filename: request.params.filename });

        // If the file is not found
        if (!file) {
            console.error("File not found:", request.params.filename); // Log missing file details
            return response.status(404).json({ msg: "File not found" });
        }

        // If the file is found, stream it to the response
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        console.error("Error in getImage:", error); // Log the error for debugging
        return response.status(500).json({ msg: error.message });
    }
};
