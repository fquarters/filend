import { exists } from "fs";

const checkFileExists = (filePath: string) => new Promise<boolean>((resolve) =>
    exists(filePath, (exists) =>
        resolve(exists)))

export default checkFileExists