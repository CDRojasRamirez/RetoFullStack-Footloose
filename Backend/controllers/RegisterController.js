import bcrypt from 'bcrypt'
import { db } from '../database/db.js'
import { addUserQuery } from '../models/user.model.js'

export const getRegister = async (req, res) => {
    try {
        res.send('AQUI TOY')
    } catch (error) {
        
    }
}

export const CreateRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const saltRounds = 10;

        // Hashear la contraseña
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) return res.json({ Error: 'Error al hashear la contraseña.' });

            // Ahora, puedes realizar la consulta a la base de datos con la contraseña hasheada
            const sql = addUserQuery;
            const values = [name, email, hash];

            db.query(sql, values, (err, result) => {
                if (err) return res.json({ Error: 'Error al guardar el usuario.', Details: err.message });
                return res.json({ Status: 'Success' });
            });
        });
    } catch (error) {
        console.error(error);
    }
};

/** ELIMINAR USUARIO */

export const DeleteUser = async (req, res) => {
    try {
        res.send('Eliminar usuario')
    } catch (error) {
        
    }
}
