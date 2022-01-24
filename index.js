import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/diary_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const app = express();
const PORT = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('It works')
})
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});