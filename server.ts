import express from "express";
import mongoose, { ConnectOptions } from "mongoose"
import cors from "cors";
import cadasterRoute from "./routes/cadasterRoute";
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
const url_database: string = process.env.DATABASE_URL as string


app.use(cors());
app.use(express.json());
app.use("/api/cadaster", cadasterRoute);

const options: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions;
  
  mongoose.connect(url_database, options)
    .then(() => {
      console.log('Connected to MongoDB');
      // Start your server or perform other operations
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
});

app.listen(port, () => {
    console.log(`O backend está rodando na porta ${port}`);
  });

