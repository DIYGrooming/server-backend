import express from 'express';
// import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Custom Built Routes
// import postRoutes from './routes/posts.js';
// import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

/* 
    Body Parser - deprecated 
    app.use(bodyParser.json({ limit: "30mb", extended: true }));
    app.use(bodyParser.json({ limit: "30mb", extended: true }));
*/
// Updated Code
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// The Custom Defined Routes
// app.use('/posts', postRoutes);
// app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('This is the PhotoDiary API!');
});

// const PORT = process.env.PORT || 5000;

// { useNewUrlParser: true, useUnifiedTopology: true } --> Deprecated

// mongoose
//   .connect(process.env.CONNECTION_URL)
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`)),
//   )
//   .catch((error) => console.log(error.message));

// mongoose.set("useFindAndModify", false); --> Deprecated
