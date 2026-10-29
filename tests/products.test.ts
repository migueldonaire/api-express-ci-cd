import request from "supertest";
import app from "../src/app";

describe("API de productos", () => {
  it("GET /api/health responde ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("GET /api/products devuelve una lista", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("GET /api/products/999 devuelve 404", async () => {
    const res = await request(app).get("/api/products/999");
    expect(res.status).toBe(404);
  });
});
