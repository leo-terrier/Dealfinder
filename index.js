import bodyParser from "body-parser";
import connectRedis from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import path from "path";
import redis from "redis";
import { fileURLToPath } from "url";
import { router as routes } from "./routes/routes.js";

dotenv.config({ path: "./.env.server" });

export const devEnv = process.env.NODE_ENV === "development";

const app = express();

const port = process.env.PORT || 8000;

let store;

if (!devEnv) {
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
  });
  redisClient.on("error", function (err) {
    console.log("Could not establish a connection with redis. " + err);
  });
  redisClient.on("connect", function (err) {
    console.log("Connected to redis successfully");
  });
  store = new RedisStore({ client: redisClient });
} else {
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  store = new session.MemoryStore();
}

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
    store,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

!devEnv && app.use(express.static(path.join(__dirname, "build")));

app.use("/", routes);

//app.use(express.static("public"));

!devEnv &&
  app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

app.listen(port, () => {
  devEnv
    ? console.log(`App listening at http://localhost:${port}`)
    : console.log(`App listening at port ${port}`);
});
