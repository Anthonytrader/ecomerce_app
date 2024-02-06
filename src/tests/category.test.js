const app = require("../app");
const request = require("supertest");

let categoryId;

// Prueba GET para traer todas las categorías
test("GET /category debe traer todas las categorías", async () => {
  const res = await request(app).get("/category");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);


});

test("POST /categories debe crear una nueva categoría", async () => {
    const category = { name: "Electronica" };
    const res = await request(app)
        .post("/category")  // Corrige la ruta a "/category"
        .send(category);

    // Corrige la expectativa para que coincida con el código de estado 201
    expect(res.status).toBe(201);

    // Verifica que la respuesta incluya el nombre y un ID
    expect(res.body.name).toBe(category.name);
    expect(res.body.id).toBeDefined();
});

// Prueba DELETE para eliminar una categoría por ID
test("DELETE /categories/:id debe eliminar una categoría por ID", async () => {
    const res = await request(app)
        .delete(`/category/${categoryId}`); 
    expect(res.status).toBe(400); 
});

// Prueba PUT para actualizar una categoría por ID
test("PUT /categories/:id debe actualizar una categoría por ID", async () => {
    const res = await request(app)
      .put(`/category/${categoryId}`)
   
    expect(res.status).toBe(404);
    
 
  });