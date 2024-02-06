const catchError = require('../utils/catchError');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt=require("jsonwebtoken");    

const getAll = catchError(async (req, res) => {
    // Omitir el campo 'password' en la respuesta
    const results = await User.findAll({
        //attributes: { exclude: ['password'] }//
    });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
    
    // Encriptar la contraseña antes de almacenarla
    const encryptedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
        password: encryptedPassword,
        firstName,
        lastName,
        email,
        phone,
    });

    // Omitir el campo 'password' en la respuesta
   const userWithoutPassword = result.toJSON();
   delete userWithoutPassword.password;

    return res.status(201).json(userWithoutPassword);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    
    // Omitir el campo 'password' en la respuesta
    const result = await User.findByPk(id, {
        attributes: { exclude: ['password'] }
    });

    if (!result) return res.sendStatus(404);

    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, password } = req.body;

    // Validar si el usuario existe
    const user = await User.findByPk(id);
    if (!user) {
        return res.sendStatus(404);
    }

    // Encriptar la nueva contraseña si se proporciona
    let encryptedPassword;
    if (password) {
        encryptedPassword = await bcrypt.hash(password, 10);
    }

    // Actualizar los campos excepto la contraseña
    await user.update({
        firstName,
        lastName,
        email,
        phone,
        password: encryptedPassword, // Actualizar la contraseña solo si se proporciona
    });

    // Omitir el campo 'password' en la respuesta
    const updatedUser = user.toJSON();
    delete updatedUser.password;

    return res.json(updatedUser);
});
const login = catchError(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email:email } });

    if (!user) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

  
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign(
        { user },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    return res.json({ user, token });
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login,
};
