const router = require('express').Router();
const { Category, Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

const opts = {
  include: [
    {
      model: Product,
      attributes: [
        'id',
        'product_name',
        'price',
        'stock'
      ],
      through: { attributes: [] },
      include: [
        {
          model: Category
        }
      ]
    }
  ]
}

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll(opts);
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
