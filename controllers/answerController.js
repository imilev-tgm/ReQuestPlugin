// controllers/answerController.js
const Answer = require('../models/Answer');
const Quest = require('../models/Quest');
const User = require('../models/User');

exports.submitAnswer = async (req, res) => {
  try {
    const { user_id, quest_id, answers } = req.body;

    // Validate quest exists by its `unique_code`
    const quest = await Quest.findOne({ unique_code: quest_id });
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }

    // Create the answer document
    const newAnswer = new Answer({ user_id, quest_id, answers });
    await newAnswer.save();

    // Increment the user's questcounter
    const user = await User.findById(user_id);
    if (user) {
      user.questcounter += 1;
      await user.save();
    } else {
      console.warn('User not found for incrementing questcounter');
    }

    res.status(201).json(newAnswer);
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ message: 'Error submitting answer', error });
  }
};

// Get all answers for a specific user
exports.getUserAnswers = async (req, res) => {
  try {
    const { user_id } = req.params;
    const answers = await Answer.find({ user_id }); // Removed populate('quest_id')
    res.status(200).json(answers);
  } catch (error) {
    console.error('Error fetching user answers:', error);
    res.status(500).json({ message: 'Error fetching answers', error });
  }
};

// Get all answers for a specific quest
exports.getQuestAnswers = async (req, res) => {
  try {
    const { quest_id } = req.params;
    const answers = await Answer.find({ quest_id }).populate('user_id');
    res.status(200).json(answers);
  } catch (error) {
    console.error('Error fetching quest answers:', error);
    res.status(500).json({ message: 'Error fetching answers', error });
  }
};
// Update an answer (e.g., for corrections or re-submissions)
exports.updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAnswer = await Answer.findByIdAndUpdate(
      id,
      { $set: req.body, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.status(200).json(updatedAnswer);
  } catch (error) {
    console.error('Error updating answer:', error);
    res.status(500).json({ message: 'Error updating answer', error });
  }
};

// Delete an answer
exports.deleteAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAnswer = await Answer.findByIdAndDelete(id);
    if (!deletedAnswer) {
      return res.status(404).json({ message: 'Answer not found' });
    }
    res.status(200).json({ message: 'Answer deleted' });
  } catch (error) {
    console.error('Error deleting answer:', error);
    res.status(500).json({ message: 'Error deleting answer', error });
  }
};