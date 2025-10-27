import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

    //cloudinary secret key
cloudinary.config({ 
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_SECRET_KEY}` // Click 'View Credentials' below to copy your API secret
});
export const cloudinaryFileUpload = async (localpath ,public_id , folder) => {
        let uploadResult;
        try {
             uploadResult = await cloudinary.uploader
            .upload(
                localpath,{
                    resource_type : "auto",
                    folder,
                    public_id,
                    use_filename : true,
                    //unique_filename : true   
                }
            )
         //fs.unlinkSync(localpath)
        } catch (error) {
            console.log("multer error" , error.message);
        };
        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(uploadResult.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        
        // Transform the image: auto-crop to square aspect_ratio
        const autoCropUrl = cloudinary.url(uploadResult.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
    return {uploadResult , autoCropUrl , optimizeUrl};
};

export const cloudinaryFileUpdate = async (publicId) => {
    try {
        const updateResult = await cloudinary.uploader
        .destroy(
            publicId,{
                invalidate : true
            }
        )
        return updateResult
    } catch (error) {
        console.log("cloudinary file update error" , error.mssage);
    };
};