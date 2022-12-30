import { Request, Response, Router } from "express";
import sharp from "sharp";
import path from "path";

// array of allowed image names
const imageNames = [
  "encenadaport",
  "fjord",
  "icelandwaterfall",
  "palmtunnel",
  "santamonica",
];

// router object for the resizeImages route
const resizeImages = Router();

// get method for the resizeImages route
resizeImages.get("/", async (req: Request, res: Response) => {
  // extract the filename, width, and height from the query parameters
  const { filename, width, height } = req.query;

  // return an error if any of the required parameters are missing
  if (!filename || !width || !height) {
    return res
      .status(400)
      .json({ error: "Filename, width, and height are required." });
  }

  // return an error if width or height are negative
  if (parseInt(width as string) < 0 || parseInt(height as string) < 0) {
    return res.status(400).json({ error: "Input value can not be negative" });
  }

  // return an error if the provided filename is not in the image names array
  if (!imageNames.includes(filename as string)) {
    return res.status(400).json({ error: "Image does not exist." });
  }

  // construct the name for the resized image file
  const searchName = `${filename}_${width}_${height}_thumb`;
  const thumbLocation = path.resolve("./") + `/assets/thumb/${searchName}.jpg`;

  try {
    // resize the image and save it to the thumbLocation file
    await sharp(`./assets/images/${filename}.jpg`)
      .resize(parseInt(width as string, 10), parseInt(height as string, 10))
      .toFile(thumbLocation);

    // send the resized image file to the client
    res.sendFile(thumbLocation);
  } catch (error) {
    console.error(error);

    // return an error if there was an issue resizing the image
    res.status(500).send("Error resizing image.");
  }
});

export default resizeImages;
