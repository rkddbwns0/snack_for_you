import { diskStorage } from 'multer';
import * as fs from 'fs';
import { extname } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = './uploads/snacks';
      console.log(uploadDir);
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${uniqueSuffix}${ext}`;
      cb(null, filename);
    },
  }),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|gif|webp/;
    const mimeType = allowedExtensions.test(file.mimetype);
    const extname_check = allowedExtensions.test(
      extname(file.originalname).toLowerCase(),
    );

    if (mimeType && extname_check) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
};
