const Usuario = require('../models/usuarioModel');
const multer = require('multer');
const path = require('path');

// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

class UsuarioController {
    static async cadastrarUsuario(req, res) {
        try {
            upload.single('foto')(req, res, async function (err) {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                const { nome } = req.body;
                const fotoPath = `/images/${req.file.filename}`;

                await Usuario.criar(nome, fotoPath);
                
                res.status(201).json({ 
                    success: true, 
                    message: 'Usuário cadastrado com sucesso!',
                    redirectUrl: '/lista-usuarios'
                });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async listarUsuarios(req, res) {
        try {
            const usuarios = await Usuario.listarTodos();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UsuarioController;