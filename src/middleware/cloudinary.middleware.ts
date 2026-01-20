import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/claudinary.config";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "products",
    allowed_formats: ["jpg", "jpeg", "png"],
  }),
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
