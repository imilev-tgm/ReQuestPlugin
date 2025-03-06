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

exports.getQuestByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const quest = await Quest.findOne({ unique_code: code });

    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    res.status(200).json(quest);
  } catch (error) {
    console.error('Error fetching quest by code:', error);
    res.status(500).json({ message: 'Error fetching quest', error });
  }
};
