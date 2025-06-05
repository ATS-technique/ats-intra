const cloudinary = require("cloudinary").v2;
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dtnqj3x1a",
  api_key: process.env.CLOUDINARY_API_KEY || "586423841396125",
  api_secret: process.env.CLOUDINARY_API_SECRET || "i7T2UIB9sX9YGPSSA7agGrZtN0M",
});

export default function uploadImage(image: Express.Multer.File, path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!image) return reject("Aucun fichier reçu");

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: path,
        overwrite: true,
        resource_type: "image",
      },
      (error: any, result: any) => {
        if (error) {
          console.error("Erreur Cloudinary :", error);
          return reject("Échec de l'envoi sur Cloudinary");
        }

        if (result?.secure_url) {
          return resolve(result.secure_url);
        } else {
          return reject("Aucune URL retournée par Cloudinary");
        }
      },
    );
    Readable.from(image.buffer).pipe(stream);
  });
}
