const Imagekit = require("imagekit");

const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile( file , filename ) {

    const result = await imagekit.upload({
        file: file,                    // required
        fileName: filename,            // required
    });

    return result;                     // return the URL of the uploded file

}

module.exports = {
    uploadFile,
}