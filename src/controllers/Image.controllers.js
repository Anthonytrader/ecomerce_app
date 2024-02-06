const catchError = require('../utils/catchError');
const Image = require('../models/Image');
const { uploadToCloudinary } = require('../utils/cloudinary');


const getAll = catchError(async(req, res) => {
    const results = await Image.findAll();
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const file = req.file;
    const { url } = await uploadToCloudinary(file);

    // Aquí cambiamos "result" a "productId"
    const { productId } = await Image.create({
        url,
        productId: req.body.productId // Así es como normalmente se obtiene el productId del cuerpo de la solicitud
    });

    return res.status(201).json({ productId }); // Devolvemos el productId en la respuesta
});


const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Image.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Image.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Image.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
}