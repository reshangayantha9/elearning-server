import {app} from "./app";
import connectDB from "./utils/db";
import {v2 as cloudinary} from 'cloudinary';
require("dotenv").config();


//cloudinary config
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_SECRET_KEY,
  secure: true
})

//create server
const port = 8000
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB();
  });