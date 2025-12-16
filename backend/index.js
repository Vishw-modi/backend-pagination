import express from "express";
import { getUsers } from "./users.controller.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.get("/users", getUsers);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
