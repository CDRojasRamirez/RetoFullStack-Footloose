import { useEffect, useState } from "react";
import axios from "axios";
import { marcas, modelos, tallas, colores } from "../utils/data";

const CreateModal = ({
  setOpenModalCreate,
  setCreateProduct,
  createProduct,
  setRefreshPage,
  refreshPage
}) => {

  const [formData, setFormData] = useState({
    NombreProducto: "",
    idMarca: 0,
    idModelo: 0,
    idColor: 0,
    idTalla: 0,
    imagen: "",
    PrecioVentaP: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      ?.post(`http://localhost:8000/products`, formData)
      .then((res) => {
        console.log(res);
        if (res.data.status === "Success") {
          alert("Creación exitosa!");
          setCreateProduct(!createProduct);
          return setOpenModalCreate(false);
        }
        alert("Creación fallida!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed">
      <div className="absolute min-h-screen w-screen flex items-center justify-center bg-black/60">
      <div className="z-[999] relative h-fit w-[800px] text-[16px] bg-slate-100 rounded-lg">
        <button
          onClick={() => setOpenModalCreate(false)}
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
              Crear producto 👋
            </h3>
            <p className="text-sm">Por favor, ingresa los datos del producto.</p>
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
              <option value="">Seleccione la marca</option>
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
              <option value="">Seleccione el modelo</option>
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
              <option value="">Seleccione el color</option>
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
              <option value="">Seleccione la talla</option>
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
              placeholder="Url de imagen"
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
              type="text"
              placeholder="Precio"
              name="PrecioVentaP"
              value={formData.PrecioVentaP}
              onChange={(e) =>
                setFormData({ ...formData, PrecioVentaP: e.target.value })
              }
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            />
          </div>

          <div className="w-full flex flex-col my-4 text-[15px]">
            <button
              type="submit"
              className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center"
            >
              Guardar producto
            </button>
            <button
              onClick={() => setOpenModalCreate(false)}
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

export default CreateModal;
