const Source = require('../models/Source');

// Get all sources
exports.getAllSources = async (req, res) => {
  try {
    const sources = await Source.find();
    res.status(200).json(sources);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sources', error });
  }
};

// Add a new source
exports.addSource = async (req, res) => {
  try {
    const newSource = new Source(req.body);
    const savedSource = await newSource.save();
    res.status(201).json(savedSource);
  } catch (error) {
    res.status(400).json({ message: 'Error adding source', error });
  }
};

// Update an existing source
exports.updateSource = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request parameters
    const updatedSource = await Source.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedSource) {
      return res.status(404).json({ message: 'Source not found' });
    }
    res.status(200).json(updatedSource);
  } catch (error) {
    res.status(400).json({ message: 'Error updating source', error });
  }
};

// Remove a source
exports.removeSource = async (req, res) => {
    try {
      const { id } = req.params; // Get ID from request parameters
      const deletedSource = await Source.findByIdAndDelete(id); // Use findByIdAndDelete
      if (!deletedSource) {
        return res.status(404).json({ message: 'Source not found' });
      }
      res.status(200).json({ message: 'Source removed' });
    } catch (error) {
      console.error('Error in removeSource:', error); // Log the error
      res.status(500).json({ message: 'Error removing source', error });
    }
  };
  