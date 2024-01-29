import {
  addProductQuery,
  getProductsQuery,
  updateProductQuery,
} from "../models/product.model.js";
import { db } from "../database/db.js";
import { sendEmail } from "../services/emailService.js";
import nodemailer from "nodemailer";

/** OBTENER TODOS LOS PRODUCTOS */
export const GetAllProducts = async (req, res) => {
  try {
    db.query(getProductsQuery, async (err, result) => {
      if (err) {
        console.error(err);
        return res.json({
          status: "Error",
          message: "Error al listar productos.",
        });
      }

      // Mapear sobre los productos para obtener información adicional
      const productosConInfoCompleta = await Promise.all(
        result.map(async (producto) => {
          // Obtener información de la marca, modelo, color y talla
          const marca = await obtenerInformacion(
            "marca",
            "idMarca",
            producto.idMarca
          );
          const modelo = await obtenerInformacion(
            "modelo",
            "idModelo",
            producto.idModelo
          );
          const color = await obtenerInformacion(
            "color",
            "idColor",
            producto.idColor
          );
          const talla = await obtenerInformacion(
            "talla",
            "idTalla",
            producto.idTalla
          );

          // Crear un nuevo objeto de producto con información adicional
          return {
            ...producto,
            marca: marca[0], // Suponiendo que la consulta devuelve un solo resultado
            modelo: modelo[0], // Suponiendo que la consulta devuelve un solo resultado
            color: color[0], // Suponiendo que la consulta devuelve un solo resultado
            talla: talla[0], // Suponiendo que la consulta devuelve un solo resultado
          };
        })
      );

      return res.json({
        status: "Success",
        message: "Productos listados exitosamente.",
        productos: productosConInfoCompleta,
      });
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "Error",
      message: "Error al procesar la solicitud.",
    });
  }
};

// Función para obtener información de la base de datos
const obtenerInformacion = (tabla, columna, id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tabla} WHERE ${columna} = ${id}`;
    db.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/** OBTENER UN SOLO  PRODUCTO */

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    db.query(
      `SELECT * FROM producto WHERE idProducto = ?`,
      [id],
      async (err, result) => {
        if (err) {
          console.error(err);
          return res.json({
            status: "Error",
            message: "Error al listar producto.",
          });
        }

        return res.json({
          status: "Success",
          message: "Producto listado exitosamente.",
          producto: result,
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.json({
      status: "Error",
      message: "Error al procesar la solicitud.",
    });
  }
};

/** FUNCION PARA OBTENER PRODUCTO POR ID DESDE EL BACK */

const GetProductById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM producto WHERE idProducto = ? `,
      [id],
      (err, result) => {
        if (err) {
          reject({
            status: "Error",
            message: "Error al listar producto.",
          });
        }
        resolve([result[0]]);
      }
    );
  });
};

/** ACTUALIZAR UN PRODUCTO */

export const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
      return res.json({
        status: "Error",
        message: "No se proporcionaron campos para actualizar.",
      });
    }

    // Obtener producto antes de la actualización para comparar el precio
    const getProductBeforeUpdate = await GetProductById(id);

    const setClauses = Object.keys(updateFields)
      .map((field) => `${field} = ?`)
      .join(", ");

    const sql = `
        UPDATE Producto
        SET ${setClauses}
        WHERE idProducto = ?
      `;

    const values = [...Object.values(updateFields), id];

    db.query(sql, values, async (err, result) => {
      if (err) {
        console.error(err);
        return res.json({
          status: "Error",
          message: "Error al actualizar el producto.",
        });
      }

      // Obtener producto después de la actualización
      const updatedProduct = await GetProductById(id);

      if (
        getProductBeforeUpdate[0]?.PrecioVenta !==
        updatedProduct[0]?.PrecioVenta
      ) {
        // Si hay un cambio en el precio, envía el correo electrónico

        const to = "cdanielrap@gmail.com";
        const subject =
          "Footloose: Uno de nuestros productos cambio de precio...";
        const html = `
        <html>
      <head>
        <style>
          h1 {
            color: #757575; 
            font-size: 22px; 
          }
          h2 {
            color: #ff002e; 
            font-size: 20px;
          }
          h3 {
            color: #6804ff; 
            font-size: 20px;
          }
          nav {
            color: #000000; 
            font-size: 20px; 
          }
          img {
            width: 300px; 
            height: 300px;
          }
        </style>
      </head>
      <body>
        <h1>El precio del producto <nav>'${updatedProduct[0].NombreProducto}'<nav/> ha sido actualizado.</h1>
        <img src="${updatedProduct[0].imagen}" alt='imagen de producto' />
        <h2>Antes: S/ ${getProductBeforeUpdate[0]?.PrecioVenta}</h2>
        <h3>Ahora: S/ ${updatedProduct[0].PrecioVenta}</h3>
      </body>
    </html>

      `;

        sendEmail(to, subject, html);

        return res.json({
          status: "Success",
          message: "Producto actualizado exitosamente.",
        });
      }

      return res.json({
        status: "Success",
        message: "Producto actualizado exitosamente.",
      });
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "Error",
      message: "Error interno al procesar la solicitud.",
    });
  }
};

/** CREAR PRODUCTO */

export const CreateProduct = async (req, res) => {
  try {
    const {
      NombreProducto,
      idMarca,
      idModelo,
      idColor,
      idTalla,
      imagen,
      PrecioVentaP,
    } = req.body;

    const user_id = req?.user_id;
    const rol_id = req?.rol_id;

    const PrecioVenta = PrecioVentaP && PrecioVentaP;

    const sql = addProductQuery;

    if (rol_id === 2) {
      db.query(
        sql,
        [
          NombreProducto,
          idMarca,
          idModelo,
          idColor,
          idTalla,
          user_id,
          imagen,
          PrecioVenta,
        ],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.json({
              status: "Error",
              message: err,
            });
          }

          return res.json({
            status: "Success",
            message: "Producto creado exitosamente.",
            productId: result.insertId,
          });
        }
      );
    } else {
      return res.json({
        status: "Error",
        message: "No tienes permisos de administrador.",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

/** crear productos masivamente */

export const CreateVariousProducts = async (req, res) => {
  try {
    const productsToCreate = req.body;

    if (!Array.isArray(productsToCreate) || productsToCreate.length === 0) {
      return res.json({
        status: "Error",
        message: "La solicitud debe contener un array de productos.",
      });
    }

    const user_id = req?.user_id;
    const rol_id = req?.rol_id;

    if (rol_id !== 2) {
      return res.json({
        status: "Error",
        message: "No tienes permisos de administrador.",
      });
    }

    // Usar Promise.all para ejecutar las consultas de inserción en paralelo
    const insertionResults = await Promise.all(
      productsToCreate.map(async (product) => {
        const {
          NombreProducto,
          idMarca,
          idModelo,
          idColor,
          idTalla,
          imagen,
          PrecioVentaP,
        } = product;

        const PrecioVenta = PrecioVentaP && PrecioVentaP;

        const sql = addProductQuery;

        return new Promise((resolve, reject) => {
          db.query(
            sql,
            [
              NombreProducto,
              idMarca,
              idModelo,
              idColor,
              idTalla,
              user_id,
              imagen,
              PrecioVenta,
            ],
            (err, result) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                resolve({
                  status: "Success",
                  message: "Producto creado exitosamente.",
                  productId: result.insertId,
                });
              }
            }
          );
        });
      })
    );

    return res.json({
      status: "Success",
      message: "Productos creados exitosamente.",
      products: insertionResults,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "Error",
      message: "Error interno al procesar la solicitud.",
    });
  }
};

/** ELIMINAR PRODUCTO */

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Obtén el ID de los parámetros de la URL

    const sql = `
        DELETE FROM Producto
        WHERE idProducto = ?
      `;

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.json({
          status: "Error",
          message: "Error al eliminar el producto.",
        });
      }

      return res.json({
        status: "Success",
        message: "Producto eliminado exitosamente.",
      });
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: "Error",
      message: "Error interno al procesar la solicitud.",
    });
  }
};
