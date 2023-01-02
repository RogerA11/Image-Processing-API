import sharp from "sharp";
import path from "path";

async function processImage(
  filename: string,
  width: number,
  height: number
): Promise<Buffer> {
  try {
    // resolve file path & open image with sharp
    const filePath = path.resolve("./assets/images/", filename + ".jpg");
    const image = sharp(filePath);

    // resize image and convert to jpeg
    const resizedImage = await image.resize(width, height).jpeg().toBuffer();

    // return resized image as a buffer
    return resizedImage;
  } catch (error) {
    console.error(error);
    throw new Error("Error processing image.");
  }
}

export default processImage;
