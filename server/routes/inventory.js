const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Get Stock
router.get('/', async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add Item
router.post('/', async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Stock
router.put('/:id', async (req, res) => {
    try {
        const updated = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Item
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Inventory.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json({ message: 'Item deleted successfully', item: deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
