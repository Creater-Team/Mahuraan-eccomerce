import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== ".jpg" &&
      ext !== ".jfif" &&
      ext !== ".jpeg" &&
      ext !== ".png"
    ) {
      cb(new Error("File is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
