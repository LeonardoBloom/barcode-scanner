const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = () => {
    
    const storageIn = multer.diskStorage({
        destination: function (req, file, cb, name) {
            cb(null, '../uploads/')
        },
        filename: function (req, file, cb, name) {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            const yyyy = today.getFullYear();
            const palletId = file.originalname.slice(0, -5)
            cb(null, `${palletId}-${dd}_${mm}_${yyyy}-${today.getHours()}${today.getMinutes()}${path.extname(file.originalname)}`);
        }
    });

    return storageIn
} 

const upload = multer({storage: storage()});



router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({error: 'No file uploaded'})
    }
    console.log("file for pallet:", req.body.pallet_id)

    console.log('File Uploaded: ', req.file)
    res.json({message: 'File uploaded successfully', file: req.file });
})

module.exports = router; 