const User = require('../models/User');
const bcrypt = require('bcryptjs');
// Get all users

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // Log the error
    res.status(500).json({ message: 'Error fetching users', error });
  }
};


// Add a new user
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error adding user', error });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  const { id } = req.params; // Expecting the user ID in the URL parameters
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error");
    res.status(400).json({ message: 'Error updating user', error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  const { id } = req.params; // Expecting the user ID in the URL parameters
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error removing user', error });
  }
};




// Existing code ...

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (isMatch) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Server error', error });
  }
};


exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Überprüfen, ob die E-Mail bereits registriert ist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Passwort hashen
    const passwordHash = await bcrypt.hash(password, 10);

    // Neuen Benutzer erstellen
    const newUser = new User({
      username,
      email,
      password_hash: passwordHash, // Gehashtes Passwort speichern
      created_at: new Date()
    });

    // Benutzer speichern
    const savedUser = await newUser.save();
    res.status(201).json({ success: true, user: savedUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Error registering user', error });
  }
};

exports.getUserIdByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ _id: user._id });
  } catch (error) {
    console.error('Error fetching user ID by email:', error);
    res.status(500).json({ message: 'Error fetching user ID', error });
  }
};

exports.incrementQuestCounter = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { questcounter: 1 } },
      { new: true }
    );
    if (!user) return res.status(404).send('User not found');
    res.status(200).send('Quest counter incremented');
  } catch (error) {
    res.status(500).send('Server error');
  }
};