import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());



// - GET
app.get("/hello", function (req, res) {
  res.send("Hello");
});



// - POST
app.post("/", function (req, res) {
  const data = req.body;
  console.log(data);
  res.status(200).send();
});



// Server Running in PORT 8000
app.listen(8000);
