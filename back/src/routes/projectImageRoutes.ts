import { Router } from "express";
import { add, getAll, getProjectImagebyPk, addMany, deleteProjectImageById } from "../controller/projectImagesController";
import auth from "../middleware/auth";
import multer from "multer";
const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 12 }, // 10 Mo, max 12 fichiers
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Type de fichier non supporté (image/* uniquement)"));
  },
});


router.post("/addProjectImage", auth, upload.single("image"), add);

router.post("/addProjectImages", auth, upload.array("images", 12), addMany);

router.get("/getAll", getAll);
router.get("/getImagesByProject/:id_project_image", auth, getProjectImagebyPk);
router.delete("/deleteProjectImage", auth, deleteProjectImageById);

export default router;