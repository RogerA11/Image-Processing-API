import { Request, Response, Router } from "express";
import fs from "fs";
import fileExist from "../../utils/fileExist";
import imageNames from "../../utils/data";
import processImage from "../../utils/imageProcessing";
import path from "path";

// create router object
const serveImage = Router();

// get method for serveImage
serveImage.get("/", async (req: Request, res: Response) => {
  // extract filename, width, and height query parameters
  type params = {
    filename: string;
    width: string;
    height: string;
  };
  const { filename, width, height } = req.query as unknown as params;

  // return an error if any of the parameters are missing
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

  // construct the file path
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "assets",
    "thumb",
    `${filename}-${width}-${height}.jpg`
  );

  try {
    // check if the file exists
    if (await fileExist(filename, width, height)) {
      // serve the file if it exists
      res.sendFile(filePath);
    } else {
      // resize the original image and save it to the thumb directory
      const resizedImage = await processImage(filename, width, height);
      fs.writeFileSync(filePath, resizedImage);

      // serve the resized image
      res.sendFile(filePath);
    }
  } catch (error) {
    console.error(error);

    // return an error if there was an issue resizing the image
    res.status(500).send("Error resizing image.");
  }
});

export default serveImage;
