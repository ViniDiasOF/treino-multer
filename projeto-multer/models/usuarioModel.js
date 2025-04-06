const pool = require('./db');

class Usuario {
    static async criar(nome, fotoPath){
        const [result] = await pool.execute(
            'INSERT INTO usuarios (nome, foto_path) VALUES (?, ?)',
            [nome,fotoPath]
        );
        return result.insertId;
    }

    static async listarTodos() {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        return rows;
    }
}

module.exports = Usuario;