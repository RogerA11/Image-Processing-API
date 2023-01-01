import processImage from "../../utils/imageProcessing";
import fileExist from "../../utils/fileExist";
import path from "path";
import fs from "fs";

describe("Testing image processing", (): void => {
  it("should generate a resized file", async (): Promise<void> => {
    const filename = "santamonica";
    const width = "444";
    const height = "444";

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

    // delete file if it already exists
    if (await fileExist(filename, width, height)) {
      fs.unlinkSync(filePath);
    }

    // call image processing function
    const resizedImage = await processImage(filename, width, height);

    // write resized image to file
    fs.writeFileSync(filePath, resizedImage);

    // test that file was created
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
