import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes'

dotenv.config();


const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server =http.createServer(app);

server.listen(8080, ()=> {
    console.log(`Server started on http://localhost:8080!`);
});

const MONGO_URL = "mongodb+srv://terencefaid:thestunna420@cluster0.bdhur1p.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
.then(()=> console.log("Database Connected.."));
mongoose.connection.on(`error`, (error: Error)=> console.log(error));

app.use("/", router());