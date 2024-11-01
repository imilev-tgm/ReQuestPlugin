const Answer = require('../models/Answer');

// Get all answers
exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find().populate('quest_id', 'title').populate('user_id', 'username');
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching answers', error });
  }
};

// Add a new answer
exports.addAnswer = async (req, res) => {
  try {
    const newAnswer = new Answer(req.body);
    const savedAnswer = await newAnswer.save();
    res.status(201).json(savedAnswer);
  } catch (error) {
    res.status(400).json({ message: 'Error adding answer', error });
  }
};
exports.updateAnswer = async (req, res) => {
    try {
      const { id } = req.params; // Get ID from request parameters
      const updatedAnswer = await Answer.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedAnswer) {
        return res.status(404).json({ message: 'Answer not found' });
      }
      res.status(200).json(updatedAnswer);
    } catch (error) {
      res.status(400).json({ message: 'Error updating Answer', error });
    }
  };

exports.removeAnswer = async (req, res) => {
      try {
        const { id } = req.params; // Get ID from request parameters
        const updatedAnswer = await Answer.findByIdAndDelete(id); // Use findByIdAndDelete
        if (!updatedAnswer) {
          return res.status(404).json({ message: 'Source not found' });
        }
        res.status(200).json({ message: 'Answer removed' });
      } catch (error) {
        console.error('Error in removeAnswer:', error); // Log the error
        res.status(500).json({ message: 'Error removing answer', error });
      }
    };
    