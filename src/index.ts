import { Elysia } from "elysia";
import rootRouter from './router/root';
import { cors } from '@elysiajs/cors'
import 'dotenv/config'
import client from "./db/connect.service";

client.connect().then(() => {
  console.log('Connected to MongoDB');
});

const app = new Elysia()

app
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    credentials: true,

  }))
  .group('/api/v2', (router) => router.use(rootRouter))
  .listen(process.env.PORT || 3048)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
