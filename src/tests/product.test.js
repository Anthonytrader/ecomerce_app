const app = require("../app");
const request = require("supertest");

let productoId;

// Prueba GET para traer todos los productos
test("GET /products debe traer todas las productos", async () => {
  const res = await request(app).get("/products");
  expect(res.status).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);


});
test("POST /products debe crear un nuevo producto", async () => {
    const newProduct = {
      title: "Apple MacBOOK Pro",
      description: "Apple M1 Pro or M1 Max chip for a massive leap in CPU, GPU, and machine learning performance. ",
      categoryId: 13,
      brand: "Apple",
      price:1300,
  
      // Agrega más campos según sea necesario
    };
  
    const res = await request(app)
      .post("/products")
      .send(newProduct);
    console.log(res.body);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProduct.title);
    expect(res.body.description).toBe(newProduct.description);
    expect(res.body.categoryId).toBe(newProduct.categoryId);
    expect(res.body.brand).toBe(newProduct.brand);
// Usar toEqual en lugar de toBe
  
    // Guarda el ID del producto para usarlo en otras pruebas o tareas
    productId = res.body.id;
  });

  let productIdToDelete;

// Prueba DELETE para eliminar un producto por ID
test("DELETE /products/:id debe eliminar un producto por ID", async () => {
  // Primero, crea un nuevo producto para asegurarnos de que haya algo para eliminar
  const newProduct = {
    title: "Producto a Eliminar",
    description: "Descripción del producto a eliminar",
    categoryId: 1,
    brand: "Marca de Ejemplo",
    price: 1300,
  };

  const createResponse = await request(app)
    .post("/products")
    .send(newProduct);

  expect(createResponse.status).toBe(201);
  expect(createResponse.body.id).toBeDefined();

  // Guarda el ID del producto creado para usarlo en la prueba de eliminación
  productIdToDelete = createResponse.body.id;

  // Ahora, realiza la prueba de eliminación
  const deleteResponse = await request(app).delete(`/products/${productIdToDelete}`);

  expect(deleteResponse.status).toBe(204);
});

let productIdToUpdate;

// Prueba PUT para actualizar un producto por ID
test("PUT /products/:id debe actualizar un producto por ID", async () => {
  // Primero, crea un nuevo producto para asegurarnos de que haya algo para actualizar
  const newProduct = {
    title: "Producto a Actualizar",
    description: "Descripción del producto a actualizar",
    categoryId: 1,
    brand: "Marca de Ejemplo",
    price: 1300,
  };

  const createResponse = await request(app)
    .post("/products")
    .send(newProduct);

  expect(createResponse.status).toBe(201);
  expect(createResponse.body.id).toBeDefined();

  // Guarda el ID del producto creado para usarlo en la prueba de actualización
  productIdToUpdate = createResponse.body.id;

  // Ahora, realiza la prueba de actualización
  const updatedProduct = {
    title: "Producto Actualizado",
    description: "Nueva descripción del producto actualizado",
    categoryId: 3,
    brand: "Nueva Marca",
    price: 1200,
  };

  const updateResponse = await request(app)
  .put(`/products/${productIdToUpdate}`)
  .send(updatedProduct);

expect(updateResponse.status).toBe(200);
expect(updateResponse.body.title).toBe(updatedProduct.title);
expect(updateResponse.body.description).toBe(updatedProduct.description);
expect(updateResponse.body.categoryId).toBe(updatedProduct.categoryId);
expect(updateResponse.body.brand).toBe(updatedProduct.brand);

// Convierte el valor recibido a un número antes de comparar
expect(parseFloat(updateResponse.body.price)).toEqual(updatedProduct.price);

// O alternativamente usando Number()
// expect(Number(updateResponse.body.price)).toEqual(updatedProduct.price);
});
