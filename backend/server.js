import express from "express";
import router from "./routes/getcountries.js";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1",router);
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
})
