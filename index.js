import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from "./routes/auth";
import notes from "./routes/notes";

mongoose.connect(`${process.env.MONGODB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
const PORT = process.env.PORT || 8000;;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

auth(app);
notes(app)

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
