const Answer = require('../models/Answer');
const Quest = require('../models/Quest');
const User = require('../models/User');
const Source = require('../models/Source');

function normalizeUrl(url) {
  return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '');
}

exports.submitAnswer = async (req, res) => {
  try {
    const { quest_id, answers } = req.body;
    const userId = req.user.userId; // Aus JWT-Token

    // Quest-Validierung
    const quest = await Quest.findOne({ unique_code: quest_id });
    if (!quest) {
      return res.status(404).json({ message: 'Quest nicht gefunden' });
    }

    // URL-Verarbeitung
    const urlSet = new Set();
    answers.forEach(answer => {
      answer.urls?.forEach(url => url.trim() && urlSet.add(url.trim()));
    });

    // Source-Erstellung
    const sourceOps = Array.from(urlSet).map(async url => {
      const normalized = normalizeUrl(url);
      return Source.findOneAndUpdate(
        { normalizedUrl: normalized },
        { $setOnInsert: { url, normalizedUrl: normalized, title: url } },
        { upsert: true, new: true }
      );
    });

    await Promise.all(sourceOps);

    // Antwort speichern
    const newAnswer = new Answer({ 
      user_id: userId, 
      quest_id,
      answers
    });
    await newAnswer.save();

    // Questcounter aktualisieren
    await User.findByIdAndUpdate(userId, { $inc: { questcounter: 1 } });

    res.status(201).json(newAnswer);
  } catch (error) {
    console.error('Fehler beim Antworten:', error);
    res.status(500).json({ message: 'Serverfehler', error });
  }
};

exports.getUserAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({ user_id: req.user.userId });
    res.status(200).json(answers);
  } catch (error) {
    console.error('Fehler beim Laden:', error);
    res.status(500).json({ message: 'Serverfehler', error });
  }
};

exports.getQuestAnswers = async (req, res) => {
  try {
    const { quest_id } = req.params;
    const answers = await Answer.find({ quest_id })
      .populate('user_id', 'username email');
    
    res.status(200).json(answers);
  } catch (error) {
    console.error('Fehler beim Laden:', error);
    res.status(500).json({ message: 'Serverfehler', error });
  }
};

exports.updateAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const answer = await Answer.findById(id);

    if (!answer) return res.status(404).json({ message: 'Antwort nicht gefunden' });
    if (answer.user_id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Zugriff verweigert' });
    }

    const updatedAnswer = await Answer.findByIdAndUpdate(
      id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );
    
    res.status(200).json(updatedAnswer);
  } catch (error) {
    console.error('Aktualisierungsfehler:', error);
    res.status(500).json({ message: 'Serverfehler', error });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);

    if (!answer) return res.status(404).json({ message: 'Antwort nicht gefunden' });
    if (answer.user_id.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Zugriff verweigert' });
    }

    await Answer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Antwort gelöscht' });
  } catch (error) {
    console.error('Löschfehler:', error);
    res.status(500).json({ message: 'Serverfehler', error });
  }
};