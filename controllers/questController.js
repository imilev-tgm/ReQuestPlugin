// controllers/questController.js
const Quest = require('../models/Quest');
const Source = require('../models/Source');


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
/**
 * Helper to normalize a URL.
 * This should match the normalization logic in your Source model.
 */
function normalizeUrl(url) {
  return url
    .replace(/^(https?:\/\/)?(www\.)?/, '') // Remove protocol and "www."
    .replace(/\/$/, ''); // Remove trailing slash
}

exports.addQuest = async (req, res) => {
  try {
    const questData = req.body;

    // Extract all non-empty URLs from quest questions and subitems
    const urlSet = new Set();
    questData.questions.forEach(question => {
      question.subitems.forEach(subitem => {
        subitem.urls.forEach(url => {
          if (url && url.trim() !== '') {
            urlSet.add(url.trim());
          }
        });
      });
    });

    // For each URL, find or create a Source document and prepare the reference for the quest
    const sourcesArray = [];
    for (const url of urlSet) {
      const normalized = normalizeUrl(url);
      let source = await Source.findOne({ normalizedUrl: normalized });
      if (!source) {
        source = await Source.create({ url, normalizedUrl: normalized, title: url });
      }
      sourcesArray.push({ source_id: source._id, rating: 0 });
    }

    // Attach the sources array to the quest data
    questData.sources = sourcesArray;

    // Now create the Quest document as usual
    const quest = await Quest.create(questData);
    res.status(201).json(quest);
  } catch (error) {
    console.error('Error creating quest:', error);
    res.status(500).json({ error: error.message });
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
