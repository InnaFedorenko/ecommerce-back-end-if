const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
  // find all tags
router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [Product],
    });
    res.json(tags);
  } catch (error) {
    console.error('Error retrieving tags:', error);
    res.status(500).json({ error: 'Failed to retrieve tags' });
  }
});
  // find a single tag by its `id`
router.get('/:id', async (req, res) => {
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });

    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error retrieving tag:', error);
    res.status(500).json({ error: 'Failed to retrieve tag' });
  }
});
  // create a new tag
router.post('/', async (req, res) => {
  try {
    const { tag_name } = req.body;

    const tag = await Tag.create({ tag_name });
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});
// update tag by id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { tag_name } = req.body;

    const tag = await Tag.findByPk(id);

    if (tag) {
      tag.tag_name = tag_name;
      await tag.save();
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error updating tag:', error);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});
  // delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByPk(id);

    if (tag) {
      await tag.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (error) {
    console.error('Error deleting tag:', error);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

module.exports = router;
