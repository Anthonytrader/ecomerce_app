const app = require("../app");
const request = require("supertest");

// Prueba GET para traer todos los productos del carrito
test("GET /productcart", async () => {
    const res = await request(app).get("/productcart");
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});



// Prueba POST para agregar un producto al carrito
test("POST /productcart", async () => {
    // Supongamos que tienes un producto válido para agregar al carrito
    const productToAdd = {
        userId:"6",
        productId: "28", // Reemplaza con el ID de un producto válido
        quantity: 2,
    };

    const res = await request(app)
        .post("/productcart")
        .send(productToAdd);
        console.log(res.body);
    expect(res.status).toBe(201); // 201 significa creado exitosamente
    expect(res.body).toHaveProperty("id"); // Asegúrate de que la respuesta contenga un ID
    expect(res.body.productId).toBe(productToAdd.productId);
    expect(res.body.quantity).toBe(productToAdd.quantity);
});

// Prueba DELETE para eliminar un producto del carrito
test("DELETE /productcart/:id", async () => {
  // Supongamos que tienes el ID de un elemento del carrito que quieres eliminar
  const productIdToDelete = 2;

  const res = await request(app).delete(`/productcart/${productIdToDelete}`);
  
  expect(res.status).toBe(204); // 204 significa "No Content", que indica que la solicitud se ha completado correctamente, pero no hay contenido para enviar en la respuesta.
});

// Prueba PUT para actualizar la cantidad de un producto en el carrito
test("PUT /productcart/:id", async () => {
    // Supongamos que tienes el ID de un elemento del carrito que quieres actualizar
    const productIdToUpdate = 2;
  
    // Supongamos que deseas actualizar la cantidad a 5
    const updatedQuantity = 5;
  
    const res = await request(app)
      .put(`/productcart/${productIdToUpdate}`)
      .send({ quantity: updatedQuantity });
      console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(updatedQuantity);
  });
  
 