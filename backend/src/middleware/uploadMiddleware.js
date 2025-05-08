import { existsSync, mkdirSync } from "fs";
import multer, { diskStorage } from "multer";
import { fileURLToPath } from 'url';
import { dirname,extname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Storage config
const storage = diskStorage({
  destination: (req, file, cb) => {
    const dir = join(__dirname, "../uploads/itemsImage");

    // Auto-create the folder if it doesn't exist
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // limit to 5MB
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpg, jpeg, png, gif)"));
    }
  },
});

export default upload;
