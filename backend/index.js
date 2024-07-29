const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration de CORS
const corsOptions = {
    origin: 'https://houbla-frontend.vercel.app', // URL de votre frontend
    methods: ['GET', 'POST'], // Méthodes autorisées
    credentials: true, // Si vous utilisez des cookies ou des informations d'identification
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Connexion à MongoDB
const mongoURI = process.env.MONGODB_URI; // Assurez-vous de définir cette variable d'environnement
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Définition du modèle utilisateur
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Endpoint pour sauvegarder les données
app.post('/api/save-json', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const newUser = new User({ email });

    try {
        await newUser.save();
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

// Démarrer le serveur (uniquement pour le développement local)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app; // Pour Vercel
