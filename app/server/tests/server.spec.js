const request = require("supertest");
const server = require("../index");


/* 
describe("Operaciones CRUD de cafes", () => {
  it("GET: Obteniendo un 200 y esperando un array con un objeto como mínimo", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(typeof response.body[1]).toBe("object");
  });

  it("DELETE: Obteniendo error 404", async () => {
    const jwt = "token";
    const idDeCafeAEliminar = 5;
    const response = await request(server)
      .delete(`/cafes/${idDeCafeAEliminar}`)
      .set("Authorization", jwt)
      .send();
    expect(response.status).toBe(404);
  });

  it("POST: Enviando un café", async () => {
    const nuevoCafe = { id: 6, nombre: "Macchiato" };
    const response = await request(server).post("/cafes").send(nuevoCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(nuevoCafe);
  });

  it("PUT: Actualizando un producto con id diferente a la del payload y devuelve 400", async () => {
    const idParams = 2;
    const cafeActualizado = { id: 4, nombre: "Capuccino" };
    const response = await request(server)
      .put(`/cafes/${idParams}`)
      .send(cafeActualizado);
    expect(response.status).toBe(400);
  });
});
 */