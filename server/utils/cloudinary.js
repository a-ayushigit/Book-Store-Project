const cloudinary = require('cloudinary').v2;
let fs = require("fs");

cloudinary.config({
    secure:true, 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});
console.log(cloudinary.config());

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null ;
        //upload the file on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type: "auto",
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        })
        //file has been uploaded successfully 
        console.log("File uploaded successfully !!!" , response.url);
        //console.log(path.join(__dirname, '..' , localFilePath) );
        // fs.unlinkSync(path.join(__dirname, '..' , localFilePath));

        console.log(response);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // removes the locally saved file as the upload operation failed , as the file can contain malicious malware 
        return null;
    }
}

module.exports = {uploadOnCloudinary};