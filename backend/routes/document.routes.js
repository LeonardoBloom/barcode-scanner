const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        cb(null, `${file.fieldname}-${dd}_${mm}_${yyyy}${path.extname(file.originalname)}`);
    }
});

const upload = multer({storage: storage});



router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: 'No file uploaded'})
    }

    console.log('File Uploaded: ', req.file)
    res.json({message: 'File uploaded successfully', file: req.file });
})

module.exports = router; 