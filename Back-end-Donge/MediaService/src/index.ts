import 'reflect-metadata';
import dotenv from "dotenv";
dotenv.config();
import app from "./server";
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/media')
  .then(() => {
    console.log('Connected to MongoDB');
    import('./container').then(() => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
          console.log(`Server started on port ${port}`);
        });
      });
  })
  .catch(console.error);