import { Router } from "express";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  { id: 1, name: "Sofá", price: 499 },
  { id: 2, name: "Mesa", price: 150 },
];

let nextId = 3;

const router = Router();

router.get("/", (_req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
    return;
  }

  res.json(product);
});

router.post("/", (req, res) => {
  const body = req.body ?? {};
  const { name, price } = body;

  if (typeof name !== "string" || name.trim() === "") {
    res.status(400).json({ error: "El nombre debe ser un texto no vacío" });
    return;
  }

  if (typeof price !== "number" || !Number.isFinite(price) || price < 0) {
    res.status(400).json({ error: "El precio debe ser un número igual o mayor que cero" });
    return;
  }

  const newProduct: Product = { id: nextId++, name: name.trim(), price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

export default router;
