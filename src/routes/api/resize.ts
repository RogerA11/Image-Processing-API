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
  const filename = req.query.filename as string;
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  // return an error if any of the parameters are missing
  if (!filename || !width || !height) {
    return res.status(400).json({
      error:
        "Parameters required with type [Filename: string, width: number (>0), height: number (>0)]",
    });
  }

  // return an error if width or height are negative
  if (width < 0 || height < 0) {
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
