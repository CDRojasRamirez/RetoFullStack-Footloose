import { useEffect, useState } from "react";
import axios from "axios";
import { sendEmail } from "../utils/sendEmail";

const UpdateModal = ({
  data,
  setOpenModalUpdate,
  setUpdateProduct,
  updateProduct,
}) => {
  console.log(data);
  const marcas = [
    { id: 1, name: "ADIDAS" },
    { id: 2, name: "NIKE" },
    { id: 3, name: "REEBOK" },
    { id: 4, name: "PUMA" },
  ];

  const modelos = [
    { id: 1, name: "RUNNING" },
    { id: 2, name: "FITNESS" },
    { id: 3, name: "DEPORTIVAS" },
    { id: 4, name: "LIGERAS" },
  ];

  const tallas = [
    { id: 1, name: "4" },
    { id: 2, name: "5" },
    { id: 3, name: "6" },
  ];

  const colores = [
    { id: 1, name: "ROJO" },
    { id: 2, name: "NEGRO" },
    { id: 3, name: "BLANCO" },
    { id: 4, name: "AZUL" },
  ];
  const [content, setContent] = useState(data);

  const [formData, setFormData] = useState({
    idProducto: 0,
    NombreProducto: "",
    idMarca: 0,
    idModelo: 0,
    idColor: 0,
    idTalla: 0,
    imagen: "",
    PrecioVenta: 0,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      idProducto: content?.idProducto,
      NombreProducto: content?.NombreProducto,
      idMarca: content?.idMarca,
      idModelo: content?.idModelo,
      idColor: content?.idColor,
      idTalla: content?.idTalla,
      imagen: content?.imagen,
      PrecioVenta: content?.PrecioVenta,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let id = content.idProducto;

    await axios
      ?.put(`http://localhost:8000/products/${id}`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          alert("Actualización exitosa!");
          setUpdateProduct(!updateProduct);
          return setOpenModalUpdate(false);
        }
        alert("Actualización fallida!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed">
      <div className="absolute min-h-screen w-screen flex items-center justify-center bg-black/60">
      <div className="z-[999] relative h-fit w-[800px] text-[16px] bg-slate-100 rounded-lg">
        <button
          onClick={() => setOpenModalUpdate(false)}
          className="absolute top-0 right-2 text-[20px] text-red-500 font-bold"
        >
          x
        </button>

        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center justify-center mx-auto bg-black/5 shadow-md px-10 py-6 rounded-lg"
        >
          <div className="w-full flex flex-col mb-10">
            <h3 className="text-2xl font-semibold mb-2">
              Actualizar producto 👋
            </h3>
            <p className="text-sm">Por favor, ingresa los nuevos datos.</p>
          </div>

          <div className="flex gap-2 w-full text-[15px]">
            <label htmlFor="" className="w-[100px]">
              Nombre:{" "}
            </label>
            <input
              type="NombreProducto"
              placeholder="Nombre"
              name="NombreProducto"
              value={formData.NombreProducto}
              onChange={(e) =>
                setFormData({ ...formData, NombreProducto: e.target.value })
              }
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="flex gap-2 w-full text-[15px]">
            <label htmlFor="" className="w-[100px]">
              Marca:
            </label>
            <select
              name=""
              id=""
              value={formData.idMarca}
              onChange={(e) =>
                setFormData({ ...formData, idMarca: Number(e.target.value) })
              }
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            >
              <option value="">Seleccione la nueva marca</option>
              {marcas.map((i) => (
                <option key={i?.id} value={i?.id}>
                  {i?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 w-full text-[15px]">
            <label htmlFor="" className="w-[100px]">
              Modelo:
            </label>
            <select
              name=""
              id=""
              value={formData.idModelo}
              onChange={(e) =>
                setFormData({ ...formData, idModelo: Number(e.target.value) })
              }
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            >
              <option value="">Seleccione el nuevo modelo</option>
              {modelos.map((i) => (
                <option key={i?.id} value={i?.id}>
                  {i?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 w-full text-[15px]">
            <label htmlFor="" className="w-[100px]">
              Color:
            </label>
            <select
              name=""
              id=""
              value={formData.idColor}
              onChange={(e) =>
                setFormData({ ...formData, idColor: Number(e.target.value) })
              }
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            >
              <option value="">Seleccione el nuevo color</option>
              {colores.map((i) => (
                <option key={i?.id} value={i?.id}>
                  {i?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 w-full text-[15px]">
            <label htmlFor="" className="w-[100px]">
              TALLA:
            </label>
            <select
              name=""
              id=""
              value={formData.idTalla}
              onChange={(e) =>
                setFormData({ ...formData, idTalla: Number(e.target.value) })
              }
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            >
              <option value="">Seleccione la nueva talla</option>
              {tallas.map((i) => (
                <option key={i?.id} value={i?.id}>
                  {i?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 w-full text-[15px]">
            <label htmlFor="" className="w-[100px]">
              Imagen:{" "}
            </label>
            <input
              type="imagen"
              placeholder="Imagen"
              name="imagen"
              value={formData.imagen}
              onChange={(e) =>
                setFormData({ ...formData, imagen: e.target.value })
              }
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="flex gap-2 w-full text-[15px]">
            <label htmlFor="" className="w-[100px]">
              Precio (S/.):{" "}
            </label>
            <input
              type="PrecioVenta"
              placeholder="Precio"
              name="PrecioVenta"
              value={formData.PrecioVenta}
              onChange={(e) =>
                setFormData({ ...formData, PrecioVenta: e.target.value })
              }
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="w-full flex flex-col my-4 text-[15px]">
            <button
              type="submit"
              className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
            >
              Guardar nuevos cambios
            </button>
            <button
              onClick={() => setOpenModalUpdate(false)}
              className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateModal;
