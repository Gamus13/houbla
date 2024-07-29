const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // Assurez-vous que 'models' est en minuscule

const port = process.env.PORT || 5844;
const mongoURI = process.env.MONGO_URI;

// App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connectez-vous à MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB!"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Route pour sauvegarder les informations utilisateur
app.post('/api/save-json', async (req, res) => {
    const { email } = req.body; // Extraire l'email du corps de la requête

    try {
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email }); // Créez une nouvelle instance du modèle
        await newUser.save(); // Enregistrez l'utilisateur dans la base de données
        res.status(201).json({ message: 'User information saved successfully!' });
    } catch (error) {
        console.error('Error saving user information:', error);
        res.status(500).json({ message: 'Error saving user information' });
    }
});

// Route de test
app.get('/', (req, res) => {
    res.send('Car Junction Backend Server Running...');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
