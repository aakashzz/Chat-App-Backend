import {v2 as cloudinary} from "cloudinary"
import  ApiError  from "./ApiError.js"
import fs from 'fs'
cloudinary.config(
    {
        cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    }
)

export async function uploadOnCloudinary(localFilePath){
    try {
        if(!localFilePath) throw new ApiError(400, "File Path Not Submit");

        const uploadedObject = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log(uploadedObject.secure_url)
        fs.unlinkSync(localFilePath)
        return {uploadedObject};
    } catch (error) {
        fs.unlinkSync(localFilePath)
        throw new ApiError(500,error?.message)
    }
}