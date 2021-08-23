const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

const opts = {
  include: [
    { 
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock'
      ]
    }
  ]
};

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll(opts);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(
      req.params.id,
      opts
    );
    
    if (!category) res.status(404).send('Category not found');
    else res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { category_name } = req.body; 

    const category = await Category.create({ category_name });
    res.status(200).json(category)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
