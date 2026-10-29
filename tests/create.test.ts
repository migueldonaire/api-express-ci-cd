import request from "supertest";
import app from "../src/app";

describe("POST /api/products", () => {
  it("crea un producto válido", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Lámpara", price: 35 });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ name: "Lámpara", price: 35 });
    expect(res.body.id).toBeDefined();
  });

  it("rechaza un producto sin nombre", async () => {
    const res = await request(app).post("/api/products").send({ price: 35 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("después de crear, el producto aparece en la lista", async () => {
    await request(app).post("/api/products").send({ name: "Silla", price: 60 });
    const res = await request(app).get("/api/products");

    const names = res.body.map((p: { name: string }) => p.name);
    expect(names).toContain("Silla");
  });
});
