import bcrypt from "bcrypt";
import { db } from "../database/db.js";
import jwt from "jsonwebtoken";
import { findUserByEmailQuery } from "../models/user.model.js";

export const CreateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    db.query(findUserByEmailQuery, [email], (err, data) => {
      if (err)
        return res.json({
          Error: "Error al intentar loggear el usuario.",
          Details: err.message,
        });

      if (data.length > 0) {
        bcrypt.compare(
          password.toString(),
          data[0].password,
          (err, response) => {
            if (err)
              return res.json({
                Error: "Error al comparar passwords.",
                Details: err.message,
              });
            if (response) {
              const rol_id = data[0].rol_id
              const user_id = data[0].user_id
              const name = data[0].name;
              const email = data[0].email
              const token = jwt.sign({ rol_id, user_id, name, email }, "jwt-secret-key", {
                expiresIn: "5d",
              });

              res.cookie("token", token);
              return res.json({ Status: "Success" });
            } else {
              return res.json({ Error: "Password es incorrecta." });
            }
          }
        );
      } else {
        return res.json({ Error: "El email no existe." });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
/** ELIMINAR USUARIO */

export const DeleteUser = async (req, res) => {
  try {
    res.send("Eliminar usuario");
  } catch (error) {}
};
