<<<<<<< HEAD
// controllers/questController.js
const Quest = require('../models/Quest');

// Get all quests
exports.getQuests = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.status(200).json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ message: 'Error fetching quests', error });
  }
};

// Add a new quest
exports.addQuest = async (req, res) => {
  try {
    const newQuest = new Quest(req.body);
    await newQuest.save();
    res.status(201).json(newQuest);
  } catch (error) {
    console.error('Error adding quest:', error);
    res.status(500).json({ message: 'Error adding quest', error });
  }
};

// Update a quest
exports.updateQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuest = await Quest.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.status(200).json(updatedQuest);
  } catch (error) {
    console.error('Error updating quest:', error);
    res.status(500).json({ message: 'Error updating quest', error });
  }
};

// Remove a quest
exports.removeQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuest = await Quest.findByIdAndDelete(id);
    if (!deletedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.status(200).json({ message: 'Quest removed' });
  } catch (error) {
    console.error('Error removing quest:', error);
    res.status(500).json({ message: 'Error removing quest', error });
  }
};
// Check if a quest exists by unique_code
exports.checkQuestExists = async (req, res) => {
  try {
    const { unique_code } = req.params; // Extract unique_code from route params
    const quest = await Quest.findOne({ unique_code });

    if (quest) {
      return res.status(200).json({ exists: true, quest });
    } else {
      return res.status(404).json({ exists: false, message: 'Quest not found' });
    }
  } catch (error) {
    console.error('Error checking quest existence:', error);
    res.status(500).json({ message: 'Error checking quest existence', error });
  }
};
=======
// controllers/questController.js
const Quest = require('../models/Quest');

// Get all quests
exports.getQuests = async (req, res) => {
  try {
    const quests = await Quest.find();
    res.status(200).json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ message: 'Error fetching quests', error });
  }
};

// Add a new quest
exports.addQuest = async (req, res) => {
  try {
    const newQuest = new Quest(req.body);
    await newQuest.save();
    res.status(201).json(newQuest);
  } catch (error) {
    console.error('Error adding quest:', error);
    res.status(500).json({ message: 'Error adding quest', error });
  }
};

// Update a quest
exports.updateQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuest = await Quest.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.status(200).json(updatedQuest);
  } catch (error) {
    console.error('Error updating quest:', error);
    res.status(500).json({ message: 'Error updating quest', error });
  }
};

// Remove a quest
exports.removeQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuest = await Quest.findByIdAndDelete(id);
    if (!deletedQuest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.status(200).json({ message: 'Quest removed' });
  } catch (error) {
    console.error('Error removing quest:', error);
    res.status(500).json({ message: 'Error removing quest', error });
  }
};
>>>>>>> c890e6a78229dca0e9a5d9c15b6da8462c42fcf8
