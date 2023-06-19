const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// Get all categories including associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
     include: [Product], // Include associated Products
    });
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Get category with the all associated products by requested id
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
     include: [Product], // Include associated Products
    });

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

// Add new category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// Update a category by selected id
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (category) {
      await category.update(req.body);
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

module.exports = router;
