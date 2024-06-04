//delete file from local storage

import fs from 'fs';
import { ApiError } from './ApiError.js';

const deleteFile = async (filePath) => {
    try {
        fs.unlink(filePath);
        // console.log("File deleted from local storage");
    } catch (err) {
        throw new ApiError(500, "Something went wrong while deleting file from local storage", err);
    }
};

export { deleteFile }
