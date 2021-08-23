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
    const { id } = req.params;
    const category = await Category.findByPk(
      id,
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

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (await Category.findByPk(id)) {
      const { category_name } = req.body;

      const result = await Category.update(
        { category_name },
        { where: { id } }
      );

      res.status(200).json("Category has been updated");
    } else {
      res.status(404).json('Category does not exist and could not be udpated');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (await Category.findByPk(id)) {
      const result = await Category.destroy(
        { where: { id } }
      );
      res.status(200).json('Category has been successfully deleted');
    } else {
      res.status(404).json('Category cannot be deleted since it does not exist')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
