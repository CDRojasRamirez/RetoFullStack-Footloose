import { useEffect, useRef, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidFilePdf } from "react-icons/bi";
import axios from "axios";
import UpdateModal from "../modals/UpdateModal";
import CreateModal from "../modals/CreateModal";
import { handleDownloadFicha } from "../utils/DownloadProductFichaPdf";
import { exportToExcel } from "../utils/ExportToExcel";
import { ExcelRenderer } from "react-excel-renderer";
import { marcas, modelos, colores, tallas } from "../utils/data";
import ImportExcelModal from "../modals/ImportExcelModal";

const DashPrincipalPage = () => {
  const tableRef = useRef(null);

  const [products, setProducts] = useState();
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalImportExcel, setOpenModalImportExcel] = useState(false);

  /**Estados de filtro */
  const [selectedModelo, setSelectedModelo] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [selectedTalla, setSelectedTalla] = useState();
  const [selectedMarca, setSelectedMarca] = useState();

  const [dataProducto, setDataProducto] = useState();
  const [filteredProducts, setFilteredProducts] = useState();

  const [name, setName] = useState();
  const [rol, setRol] = useState();

  const [searchTerm, setSearchTerm] = useState("");

  const [cols, setCols] = useState();
  const [refreshPage, setRefreshPage] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8000")
      .then((res) => {
        if (res.data.Status === "Success") {
          if (res.data.details.rol_id === 2) {
            setName(res.data.details.name);
            setRol(res.data.details.rol_id);
            return;
          }
          return navigate("/");
        } else {
          return navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then(({ data }) => {
        setProducts(data.productos);
      })
      .catch((err) => console.log(err));
  }, [deleteProduct, updateProduct, refreshPage, createProduct]);

  /**Para busqueda */
  useEffect(() => {
    const data = products?.filter((product) => {
      return searchTerm
        ? product?.NombreProducto?.toLowerCase()?.includes(
            searchTerm.toLowerCase()
          ) || product?.idProducto?.toString()?.includes(searchTerm)
        : selectedModelo
        ? product?.idModelo === Number(selectedModelo)
        : selectedMarca
        ? product?.idMarca === Number(selectedMarca)
        : selectedColor
        ? product?.idColor === Number(selectedColor)
        : selectedTalla
        ? product?.idTalla === Number(selectedTalla)
        : product?.NombreProducto?.toLowerCase()?.includes(
            searchTerm.toLowerCase()
          ) || product?.idProducto?.toString()?.includes(searchTerm);
    });

    setFilteredProducts(data);
  }, [
    searchTerm,
    products,
    selectedModelo,
    selectedColor,
    selectedMarca,
    selectedTalla,
  ]);

  const handleEdit = (data) => {
    setOpenModalUpdate(true);
    setDataProducto(data);
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`http://localhost:8000/products/${id}`)
      .then(({ data }) => {
        console.log(data);
        if (data.status === "Success") {
          setDeleteProduct(!deleteProduct);
          return alert("Producto eliminado correctamente.");
        }
        alert("El producto no puede eliminarse.");
      })
      .catch((err) => console.log(err));
  };

  // Función para manejar cambios en el término de búsqueda
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    ExcelRenderer(file, (err, response) => {
      if (err) console.log(err);

      if (response?.rows?.slice(1)) {
        setCols(response?.rows?.slice(1));
        setOpenModalImportExcel(true);
      }
    });
  };

  // Funciones auxiliares para obtener ID por nombre
  const getMarcaIdByName = (name) =>
    marcas.find((marca) => marca.name === name)?.id;
  const getModeloIdByName = (name) =>
    modelos.find((modelo) => modelo.name === name)?.id;
  const getTallaIdByName = (name) =>
    tallas.find((talla) => talla.name === name)?.id;
  const getColorIdByName = (name) =>
    colores.find((color) => color.name === name)?.id;

  const productsView = cols?.map((producto) => {
    return {
      NombreProducto: producto[1],
      idMarca: producto[2],
      idModelo: producto[3],
      idColor: producto[4],
      idTalla: producto[5],
      imagen: producto[6],
      PrecioVentaP: parseFloat(producto[7]),
    };
  });

  const productsTransform = cols?.map((producto) => {
    return {
      NombreProducto: producto[1],
      idMarca: getMarcaIdByName(producto[2]),
      idModelo: getModeloIdByName(producto[3]),
      idColor: getColorIdByName(producto[4]),
      idTalla: getTallaIdByName(producto[5]),
      imagen: producto[6],
      PrecioVentaP: parseFloat(producto[7]),
    };
  });

  return (
    <div className="flex w-screen min-h-screen ">
      <div className="w-screen h-full flex flex-col mx-auto">
        <div className="mx-10 min-h-fit">
          <div className="w-full flex justify-between mt-4">
            <Link to={"/"} className="">
              Volver al home
            </Link>
            <div className="flex gap-10 my-auto py-auto">
              <h1>
                {name}{" "}
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/user-male-circle--v1.png"
                  alt="user-male-circle--v1"
                  className="inline-block h-[28px] w-[28px]"
                />{" "}
                {rol && rol === 2 && "admin"}
              </h1>
            </div>
          </div>

          <div className="mt-10 mb-2">
            <h1 className="font-bold w-fit border-[#381850] border-b-4">
              TODOS LOS PRODUCTOS
            </h1>
          </div>

          <div className="flex justify-between">
            <div className="flex gap-2">
              <select
                name=""
                id=""
                value={selectedMarca}
                onChange={(e) => setSelectedMarca(e.target.value)}
                className="w-fit text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              >
                <option value="">Por marca</option>
                {marcas.map((i) => (
                  <option key={i?.id} value={i?.id}>
                    {i?.name}
                  </option>
                ))}
              </select>
              <select
                name=""
                id=""
                value={selectedModelo}
                onChange={(e) => setSelectedModelo(e.target.value)}
                className="w-fit text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              >
                <option value="">Por modelo</option>
                {modelos.map((i) => (
                  <option key={i?.id} value={i?.id}>
                    {i?.name}
                  </option>
                ))}
              </select>
              <select
                name=""
                id=""
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-fit text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              >
                <option value="">Por color</option>
                {colores.map((i) => (
                  <option key={i?.id} value={i?.id}>
                    {i?.name}
                  </option>
                ))}
              </select>
              <select
                name=""
                id=""
                value={selectedTalla}
                onChange={(e) => setSelectedTalla(e.target.value)}
                className="w-fit text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              >
                <option value="">Por talla</option>
                {tallas.map((i) => (
                  <option key={i?.id} value={i?.id}>
                    {i?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 my-auto">
              <label htmlFor="" className="font-bold text-sm">
                Importar Excel:{" "}
              </label>
              <input
                type="file"
                onChange={handleFile}
                className="my-auto outline-none"
              />
            </div>
          </div>

          <div className="my-4 w-full flex justify-between">
            <input
              type="text"
              placeholder="Buscar por nombre o id"
              className="rounded-[10px] w-[500px] p-2 bg-[#f1f1f1] border-[1px] border-[#9e9e9e]"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <div className="flex gap-4">
              <button
                onClick={() =>
                  exportToExcel(filteredProducts && filteredProducts)
                }
                className="bg-green-600 hover:bg-green-700 duration-300 ease-linear transition-all text-white px-4 py-2 rounded-[10px]"
              >
                Exportar Excel
              </button>
              <button
                onClick={() => setOpenModalCreate(true)}
                className="bg-[#EA580C] hover:bg-orange-700 duration-300 ease-linear transition-all text-white px-4 py-2 rounded-[10px]"
              >
                Crear producto
              </button>
            </div>
          </div>

          <div>
            <div className="overflow-x-auto rounded-lg border-2 shadow-lg">
              <table ref={tableRef} className="min-w-full table-auto mb-20">
                <thead className="border-b-4 border-bor-red rounded-md">
                  <tr className="bg-[#dcffdb]">
                    <th className="border px-4 py-2 font-extralight">#</th>
                    <th className="border px-4 py-2 font-extralight">ID</th>
                    <th className="border px-4 py-2 font-extralight">Nombre</th>
                    <th className="border px-4 py-2 font-extralight">Marca</th>
                    <th className="border px-4 py-2 font-extralight">Modelo</th>
                    <th className="border px-4 py-2 font-extralight">Color</th>
                    <th className="border px-4 py-2 font-extralight">Talla</th>
                    <th className="border px-4 py-2 font-extralight">Imagen</th>
                    <th className="border px-4 py-2 font-extralight">Precio</th>
                    <th className="border px-4 py-2 font-extralight">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {filteredProducts?.map((arr, index) => (
                    <tr
                      key={arr?.idProducto}
                      className="border-b-4 border-bor-red text-[12px]"
                    >
                      <td className="text-center px-4 py-2">{index + 1}</td>
                      <td className="text-center px-4 py-2">
                        {arr?.idProducto}
                      </td>
                      <td className="text-center pt-2 font-medium leading-4 w-[200px]">
                        {arr?.NombreProducto}
                      </td>
                      <td className="text-center pt-2 font-medium  w-[200px]">
                        {arr?.marca?.NombreMarca}
                      </td>
                      <td className="text-center pt-2 font-medium  w-[200px]">
                        {arr?.modelo?.NombreModelo}
                      </td>
                      <td className="text-center pt-2 font-medium  w-[200px]">
                        {arr?.color?.NombreColor}
                      </td>
                      <td className="text-center pt-2 font-medium  w-[200px]">
                        {arr?.talla?.NombreTalla}
                      </td>
                      <td className="text-center pt-2 font-medium w-[200px]">
                        <img
                          src={arr?.imagen}
                          alt="imagen de producto"
                          className="object-cover w-fit h-[50px] mx-auto"
                        />
                      </td>
                      <td className="text-center pt-2 font-medium  w-[200px]">
                        <label className="text-center py-2" htmlFor="">
                          S/ {arr?.PrecioVenta}
                        </label>
                      </td>

                      <td className="text-center px-1 py-2 mt-2 flex text-sm gap-1 items-center justify-center">
                        <button
                          onClick={() => handleEdit(arr && arr)}
                          className="px-2 py-1 my-auto rounded-md bg-orange-500 hover:bg-orange-600 font-extrabold text-white w-fit"
                        >
                          <AiTwotoneEdit className="w-[16px] h-[16px]" />
                        </button>
                        <button
                          className="px-2 py-1 my-auto rounded-md bg-red-500 hover:bg-red-600 font-extrabold text-white w-fit"
                          onClick={() => handleDelete(arr?.idProducto)}
                        >
                          <AiFillDelete className="w-[16px] h-[16px]" />
                        </button>

                        <button
                          className="px-2 py-1 my-auto rounded-md bg-blue-500 hover:bg-blue-600 font-extrabold text-white w-fit"
                          onClick={() => handleDownloadFicha(arr && arr)}
                        >
                          <BiSolidFilePdf className="w-[16px] h-[16px]" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {openModalUpdate && (
        <UpdateModal
          data={dataProducto}
          setOpenModalUpdate={setOpenModalUpdate}
          updateProduct={updateProduct}
          setUpdateProduct={setUpdateProduct}
        />
      )}
      {openModalCreate && (
        <CreateModal
          data={dataProducto}
          setOpenModalCreate={setOpenModalCreate}
          createProduct={createProduct}
          setCreateProduct={setCreateProduct}
        />
      )}
      {openModalImportExcel && (
        <ImportExcelModal
          setRefreshPage={setRefreshPage}
          refreshPage={refreshPage}
          productsTransform={productsTransform && productsTransform}
          productsView={productsView && productsView}
          setOpenModalImportExcel={
            setOpenModalImportExcel && setOpenModalImportExcel
          }
        />
      )}
    </div>
  );
};

export default DashPrincipalPage;
