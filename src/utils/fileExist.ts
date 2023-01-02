import fs from "fs";

async function fileExist(
  filename: string,
  width: number,
  height: number
): Promise<boolean> {
  // construct the file path
  const filePath = `/assets/thumb/${filename}-${width}-${height}.jpg`;

  try {
    // check if the file exists
    fs.accessSync(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

export default fileExist;
