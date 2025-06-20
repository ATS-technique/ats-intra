"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = uploadImage;
const cloudinary = require("cloudinary").v2;
const stream_1 = require("stream");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dysklxwyu",
    api_key: process.env.CLOUDINARY_API_KEY || "586423841396125",
    api_secret: process.env.CLOUDINARY_API_SECRET || "i7T2UIB9sX9YGPSSA7agGrZtN0M",
});
function uploadImage(image, path) {
    return new Promise((resolve, reject) => {
        if (!image)
            return reject("Aucun fichier reçu");
        const stream = cloudinary.uploader.upload_stream({
            folder: path,
            overwrite: true,
            resource_type: "image",
        }, (error, result) => {
            if (error) {
                console.error("Erreur Cloudinary :", error);
                return reject("Échec de l'envoi sur Cloudinary");
            }
            if (result === null || result === void 0 ? void 0 : result.secure_url) {
                return resolve(result.secure_url);
            }
            else {
                return reject("Aucune URL retournée par Cloudinary");
            }
        });
        stream_1.Readable.from(image.buffer).pipe(stream);
    });
}
