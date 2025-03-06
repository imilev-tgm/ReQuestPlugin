const Source = require('../models/Source');
const User = require('../models/User')

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
// Add a new source
// Add a new source or return existing source
exports.addSource = async (req, res) => {
  try {
    const { url, title } = req.body;

    // Normalize the URL
    const normalizedUrl = normalizeUrl(url);

    // Check if the source already exists
    const existingSource = await Source.findOne({ normalizedUrl });
    if (existingSource) {
      // Return the existing source without throwing an error
      return res.status(200).json({
        message: 'Source already exists',
        source: existingSource
      });
    }

    // If the source does not exist, create a new one
    const newSource = new Source({ url, normalizedUrl, title });
    const savedSource = await newSource.save();

    res.status(201).json({
      message: 'Source added successfully',
      source: savedSource
    });
  } catch (error) {
    res.status(400).json({ message: 'Error adding source', error });
  }
};

// Utility function to normalize a URL
function normalizeUrl(url) {
  return url
    .replace(/^(https?:\/\/)?(www\.)?/, '') // Remove protocol and "www."
    .replace(/\/$/, ''); // Remove trailing slash
}


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

// Add a like to a source
exports.addLike = async (req, res) => {
  try {
    const { url, email } = req.body;

    // Normalize the URL
    const normalizedUrl = normalizeUrl(url);

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the source by normalized URL
    const source = await Source.findOne({ normalizedUrl });
    if (!source) {
      return res.status(404).json({ message: 'Source not found' });
    }

    // Prevent duplicate likes
    if (source.likes.some(like => like.user_id.toString() === user._id.toString())) {
      return res.status(200).json({ message: 'User has already liked this source', source });
    }

    // Remove dislike if it exists
    source.dislikes = source.dislikes.filter(dislike => dislike.user_id.toString() !== user._id.toString());

    // Add like
    source.likes.push({ user_id: user._id });
    await source.save();

    res.status(200).json({ message: 'Source liked successfully', source });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ message: 'Error adding like', error });
  }
};

// Add a dislike to a source using URL and email
exports.addDislike = async (req, res) => {
  try {
    const { url, email } = req.body;

    // Normalize the URL
    const normalizedUrl = normalizeUrl(url);

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the source by normalized URL
    const source = await Source.findOne({ normalizedUrl });
    if (!source) {
      return res.status(404).json({ message: 'Source not found' });
    }

    // Prevent duplicate dislikes
    if (source.dislikes.some(dislike => dislike.user_id.toString() === user._id.toString())) {
      return res.status(200).json({ message: 'User has already disliked this source', source });
    }

    // Remove like if it exists
    source.likes = source.likes.filter(like => like.user_id.toString() !== user._id.toString());

    // Add dislike
    source.dislikes.push({ user_id: user._id });
    await source.save();

    res.status(200).json({ message: 'Source disliked successfully', source });
  } catch (error) {
    console.error('Error adding dislike:', error);
    res.status(500).json({ message: 'Error adding dislike', error });
  }
};


// Find a source by URL
exports.findSourceByUrl = async (req, res) => {
  try {
    const { url } = req.query; // URL passed as a query parameter

    // Normalize the URL
    const normalizedUrl = normalizeUrl(url);

    const source = await Source.findOne({ normalizedUrl });
    if (!source) {
      return res.status(404).json({ message: 'Source not found' });
    }

    res.status(200).json(source);
  } catch (error) {
    res.status(500).json({ message: 'Error finding source', error });
  }
};

exports.searchBatch = async (req, res) => {
  const { urls } = req.body; // Erwartet ein Array von URLs im Request-Body

  try {
    // Normalisiere alle URLs
    const normalizedUrls = urls.map(url => normalizeUrl(url));

    // Suche die Quellen in der Datenbank
    const sources = await Source.find({ normalizedUrl: { $in: normalizedUrls } });

    res.status(200).json(sources);
  } catch (error) {
    console.error("Fehler beim Suchen von Quellen:", error);
    res.status(500).json({ message: 'Fehler beim Suchen von Quellen', error });
  }
};