import { diskStorage } from 'multer';
import { resolve } from 'path';
import * as path from 'path';
const guidGenerator = require('uuid');

export const multerConfig = ({
    storage: diskStorage({
        destination: (req, file, callback) => {
            callback(null, resolve(__dirname, '..','media'))
        },
        filename: (req, file, callback) => {
            const guid = guidGenerator.v4();
            callback(null, guid + '.jpeg');
        }
    }),
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only jpeg or jpg are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024
    }
});