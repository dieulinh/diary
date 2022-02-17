import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import auth from "./routes/auth";
import notes from "./routes/notes";

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@diary-cluster-enna.po0ap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const app = express();
const PORT = 8000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

auth(app);
notes(app)

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
