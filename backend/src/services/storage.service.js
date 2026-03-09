const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   urlEndPoint: process.env.IMAGEKIT_URL_ENDPOINT
});

//Now we gonna create a function with two parameters file and fileName

const uploadFile = async (buffer, fileName) => {
  try {
    const response = await imagekit.files.upload({
      file: buffer.toString("base64"), // convert buffer → base64
      fileName: fileName
    });

    return response;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

module.exports = { uploadFile };