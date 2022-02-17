import express from "express";
import verifyToken from "../middleware/verifyToken";
import notes from "../controllers/notes";

export default app => {
  const router = express.Router();
  router.post("/:username/add", notes.createNote);
  router.get("/:username/notes", notes.getAllNotes);
  router.get("/note/:id", notes.getNote);
  router.put("/note/:id", notes.updateNote);
  app.use(router);
}