import express, { Express} from "express";
import dotenv from "dotenv";
import postRouter from "./routes/post.router";
import userRouter from "./routes/user.router";
import likeRouter from "./routes/like.router";
import { errorHandler } from "./middleware";

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT;
app.use(express.json())

app.use((req, res, next) => {
  console.log(`Request made in path: ${req.url}`);
  next();
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/like', likeRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});