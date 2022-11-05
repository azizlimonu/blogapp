const router = require("express").Router();
const Category = require("../model/Category");

// post or add category
router.post('/', async (req, res) => {
  const newCategory = new Category(req.body)
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all the category
router.get('/', async (req, res) => {
  try {
    const foundCategory = await Category.find();
    res.status(200).json(foundCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;