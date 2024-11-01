const QuestLibrary = require('../models/QuestLibrary');

// Get all quest libraries for a user
exports.getQuestLibrary = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from request parameters
    const questLibrary = await QuestLibrary.find({ user_id: userId }).populate('quest_id', 'title');
    res.status(200).json(questLibrary);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quest library', error });
  }
};

// Add a new quest to the library
exports.addQuestToLibrary = async (req, res) => {
  try {
    const newQuestLibraryEntry = new QuestLibrary(req.body);
    const savedEntry = await newQuestLibraryEntry.save();
    res.status(201).json(savedEntry);
  } catch (error) {
    res.status(400).json({ message: 'Error adding quest to library', error });
  }
};

// Update an existing quest library entry
exports.updateQuestInLibrary = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request parameters
    const updatedEntry = await QuestLibrary.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEntry) {
      return res.status(404).json({ message: 'Quest library entry not found' });
    }
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(400).json({ message: 'Error updating quest in library', error });
  }
};

// Remove a quest from the library
exports.removeQuestFromLibrary = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request parameters
    const deletedEntry = await QuestLibrary.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: 'Quest library entry not found' });
    }
    res.status(200).json({ message: 'Quest removed from library' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing quest from library', error });
  }
};
