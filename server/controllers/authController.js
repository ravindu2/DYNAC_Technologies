// controllers/authController.js
const { auth, db } = require('../services/firebaseService');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { setDoc, doc } = require('firebase/firestore');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => {
  const { email, password, name, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    await setDoc(doc(db, 'users', userId), { name, email, role });

    res.status(200).json({ message: 'Signup successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    
    const user = userCredential.user;

    const payload = {
      uid: user.uid,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = { signup, login };
