const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Form = require('../model/form');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        const filePath = req.file.path;
        const fileContent = fs.readFileSync(filePath, 'utf-8').trim();

        const lines = fileContent.split('\n');

        const formData = lines.map(line => {
            if (/^\d{4}-\d{2}-\d{2}/.test(line)) {
                return null;
            }

            const timestampSenderMessage = line.split(' - ');
            if (timestampSenderMessage.length < 2) {
                return null;
            }

            const time = timestampSenderMessage[0].trim(); 
            const senderMessage = timestampSenderMessage[1].trim();

            const colonIndex = senderMessage.indexOf(':');
            const sender = senderMessage.slice(0, colonIndex).trim();
            const message = senderMessage.slice(colonIndex + 1).trim();

            if (sender.startsWith('+91')) {
                return null;
            }

            const isNumber = /^[0-9+]+$/.test(sender);

            let firstName = '';
            if (!isNumber) {
                firstName = sender.split(' ')[0];
            }

            return {
                firstName: firstName,
                mobileNumber: isNumber ? sender : ' ',
                time: time,
                message: message,
                email: ' ',
                gender: ' ',
                qualification: ' ',
                hobbies: []
            };
        }).filter(formData => formData !== null);

        await Form.insertMany(formData);

        res.status(201).send(formData);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
