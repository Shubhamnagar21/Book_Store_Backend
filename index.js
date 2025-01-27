import express, { request, response, urlencoded } from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoutes.js";
import { config } from "dotenv";
config({ path: "./.env" });
import cors from "cors";


const app = express();

// middleWare for parsing request body
app.use(express.json());

// Middle for handling CORS Policy
// Option 1: Allow all origins with Default of Cors(*)
// app.use(cors());
// Option 2: Allow custom Origins
app.use(cors({
  origin:['http://localhost:5173','https://book-store-frontend-ten-lake.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Home Route
app.get("/", (request, response) => {
  // console.log(request);
  return response.status(234).send("Hello World");
});

// Routes
app.use("/books", booksRoute);

mongoose
  .connect(process.env.mongodbURL)
  .then(() => {
    console.log("database connected");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`App is listing to port: ${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

export default app;
