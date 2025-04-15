const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const User = require('./models/User');
const ChatMessage = require('./models/ChatMessage');  // Import the ChatMessage model

const app = express();

// === Middleware ===
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// === MongoDB Connection ===
mongoose.connect('mongodb://mongo:27017/signupDB', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// === Static Files ===
app.use(express.static(path.join(__dirname, 'public')));

// === Routes ===

// Serve signup.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle signup form submission
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  console.log("📥 Signup Request Received:", req.body); // Debug log

  try {
    const user = new User({ username, password });
    await user.save();
    
    console.log("✅ User saved to DB:", user); // Log the user saved to DB
    console.log("📜 User Data Saved: ", JSON.stringify(user, null, 2)); // Log the user data clearly in the terminal

    res.send('User registered successfully!');
  } catch (error) {
    console.error("❌ Error saving user:", error);
    res.status(500).send('Error saving user');
  }
});

// === Chat Routes ===

// POST: Store a new chat message
app.post('/chat', async (req, res) => {
  const { message, username } = req.body;

  try {
    const chatMessage = new ChatMessage({ message, username });
    await chatMessage.save();
    console.log("✅ Chat message saved:", chatMessage);
    res.status(200).send('Message sent!');
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).send('Error saving message');
  }
});

// GET: Retrieve all chat messages
app.get('/chat', async (req, res) => {
  try {
    const chatMessages = await ChatMessage.find().sort({ timestamp: 1 });  // Sort messages by timestamp (oldest first)
    res.json(chatMessages);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).send('Error fetching messages');
  }
});

// === Start Server ===
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
