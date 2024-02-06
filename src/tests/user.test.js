const app = require("../app");
const request = require("supertest");

let id;
let token;


//PUBLICOS
test("POST/users", async () => {
  const user = {
    firstName: "Anthony",
    lastName: "Mendoza",
    email: "goodfriend_18@hotmail.com",
    password: "anthony123",
    phone: "993902001",
  };

  const res = await request(app)
    .post("/users")
    .send(user);
    console.log(res.body)
    id=res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(user.firstName);
  expect(res.body.id).toBeDefined();
});

test("POST /users/login debe autenticar al usuario y devolver un token", async () => {
  // Supongamos que tienes un usuario registrado en la base de datos
  const credentials = {
    email: "adolf@email.com",
    password: "adolfo",
  };

  const res = await request(app)  

    .post("/user/login")
    .send(credentials);
  token=res.body.token
  expect(res.status).toBe(200);
  expect(res.body.user.email).toBe(credentials.email);
  expect(res.body.token).toBeDefined();
});


//PROTEGIDOS
// Prueba GET para traer todos los usuarios
test("GET /users debe traer todos los usuarios", async () => {
  const res = await request(app).get("/users")
  .set("Authorization",`Bearer ${token}`);
  console.log(res.body)
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});


// PUT /users/:id
test("PUT /users/:id", async () => {
  const userUpdated = {
    firstName: "Peter",
  };

  const res = await request(app)
    .put(`/users/${id}`)
    .send(userUpdated) // Utiliza .send() para enviar el cuerpo de la solicitud
    .set("Authorization",`Bearer ${token}`);
    console.log(res.body)
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(userUpdated.firstName);
});



// DELETE /users/:id
test("DELETE /users/:id", async () => {
  const res = await request(app).delete(`/users/${id}`)
  .set("Authorization",`Bearer ${token}`);
  expect(res.status).toBe(204);
});




