import express from "express";
import { subtraction } from "./utils/math";

const app = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World");
});

app.get("/health", (req: express.Request, res: express.Response) => {
    res.status(200).json({ status: "ok" });
});

app.get("/subtraction", (req: express.Request, res: express.Response) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    res.json({ result: subtraction(a, b) });
});

export default app;