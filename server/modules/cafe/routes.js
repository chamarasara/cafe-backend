const { Router } = require('express');
const { createCafe, getAllCafes, getCafe, deleteCafe, updateCafe } = require('./controllers');
const CafeRoutes = new Router();
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/logos/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



CafeRoutes.post('/v1/cafe', upload.single('logo'), createCafe);
CafeRoutes.get('/v1/cafe', getAllCafes);
CafeRoutes.get('/v1/cafe/:id', getCafe);
CafeRoutes.put('/v1/cafe/:id', upload.single('logo'), updateCafe);
CafeRoutes.delete('/v1/cafe/:id', deleteCafe);


module.exports = CafeRoutes;