
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/save-json', (req, res) => {
    const { email } = req.body;
    // console.log('Received data:', req.body); // Log the received data

    if (!email) {
        return res.status(400).send('Email is required');
    }

    const newUserData = {
        email,
        date: new Date().toISOString() // Ajouter la date de stockage
    };

    const filePath = './data/all-users-info.json';

    fs.readFile(filePath, 'utf8', (err, fileData) => {
        let usersData = [];
        if (!err && fileData) {
            try {
                usersData = JSON.parse(fileData);
            } catch (error) {
                console.error('Error parsing existing JSON file:', error);
            }
        }

        usersData.push(newUserData);

        fs.writeFile(filePath, JSON.stringify(usersData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Error writing JSON file:', err);
                return res.status(500).send('Error saving data');
            }
            res.status(200).send('Data saved successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// const express = require('express');
// const fs = require('fs');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Welcome to the server!');
// });

// app.post('/save-json', (req, res) => {
//     const { email } = req.body;
//     // console.log('Received data:', req.body); // Log the received data

//     if (!email) {
//         return res.status(400).send('Email is required');
//     }

//     const newUserData = {
//         email,
//         date: new Date().toISOString() // Ajouter la date de stockage
//     };

//     const filePath = './data/all-users-info.json';

//     fs.readFile(filePath, 'utf8', (err, fileData) => {
//         let usersData = [];
//         if (!err && fileData) {
//             try {
//                 usersData = JSON.parse(fileData);
//             } catch (error) {
//                 console.error('Error parsing existing JSON file:', error);
//             }
//         }

//         usersData.push(newUserData);

//         fs.writeFile(filePath, JSON.stringify(usersData, null, 2), 'utf8', (err) => {
//             if (err) {
//                 console.error('Error writing JSON file:', err);
//                 return res.status(500).send('Error saving data');
//             }
//             res.status(200).send('Data saved successfully');
//         });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
