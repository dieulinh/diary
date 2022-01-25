import express from "express";
import verifyToken from "../middleware/verifyToken";
import notes from "../controllers/notes";

export default app => {
  const router = express.Router();
  router.post("/:username/add", notes.createNote);
  app.use(router);
}