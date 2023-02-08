import { diskStorage } from 'multer';
import { resolve } from 'path';
const guidGenerator = require('uuid');

export const multerConfig = ({
    storage: diskStorage({
        destination: (req, file, callback) => {
            callback(null, resolve(__dirname, '..','media'))
        },
        filename: (req, file, callback) => {
            const guid = guidGenerator.v4();
            callback(null, guid + '_' + file.originalname);
        }
    })
});