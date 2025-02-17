const imageService = require('../services/imageService')

const checkImageExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await imageService.getImage(id);
    if (result.rows.length === 0) {
      return res.status(404).send(`Image not found for id : ${id}`);
    }
    req.image = result.rows[0]; //store data
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkImageExists;
