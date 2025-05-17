const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'assets', 'uploads', 'perfil');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

router.post('/cadastrar', usuarioController.cadastrar);
router.post('/autenticar', usuarioController.autenticar);
router.post('/upload/perfil', upload.single('imagem'), usuarioController.uploadImagemPerfil);
router.get("/upload/perfil/:idusuario", usuarioController.carregarImagemPerfil);

module.exports = router;