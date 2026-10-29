import express from "express";
import type { NextFunction, Request, Response } from "express";
import productsRouter from "./routes/products";

const app = express();

// CORS: el origen permitido depende del entorno (variable CORS_ORIGIN)
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.CORS_ORIGIN ?? "http://127.0.0.1:5500"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

// Para el smoke test: dice que la API responde y qué versión es
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", version: process.env.APP_VERSION ?? "dev" });
});

app.use("/api/products", productsRouter);

app.use((req, res) => {
  res.status(404).json({ error: `No existe la ruta ${req.method} ${req.url}` });
});

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError) {
    res.status(400).json({ error: "El body no es un JSON válido" });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

export default app;
