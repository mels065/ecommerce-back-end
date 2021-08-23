const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

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
      through: { attributes: [] }
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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByPk(
      id,
      opts
    );
    if (!tag) res.status(404).json('Tag could not be found');
    else res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { tag_name } = req.body; 

    const tag = await Tag.create({ tag_name });
    res.status(200).json(tag)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (await Tag.findByPk(id)) {
      const { tag_name } = req.body;

      const result = await Tag.update(
        { tag_name },
        { where: { id } }
      );

      res.status(200).json("Tag has been updated");
    } else {
      res.status(404).json('Tag does not exist and could not be udpated');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
