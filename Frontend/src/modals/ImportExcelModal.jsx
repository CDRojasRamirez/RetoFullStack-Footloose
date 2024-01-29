import axios from "axios";

const ImportExcelModal = ({
  productsTransform,
  productsView,
  setOpenModalImportExcel,
  setRefreshPage,
  refreshPage,
}) => {
  const saveProductsExcel = () => {
    axios
      .post(
        "http://localhost:8000/products/create-products",
        productsTransform && productsTransform
      )
      .then(({ data }) => {
        // Manejar la respuesta exitosa, si es necesario
        console.log(data);
        if (data.status === "Success") {
          alert("Productos guardados exitosamente!");
          setRefreshPage(!refreshPage);
          setOpenModalImportExcel(false);
          return;
        }
        alert("Hubo un error, intentalo de nuevo mas tarde");
        setOpenModalImportExcel(false);
        return;
      })
      .catch((error) => {
        // Manejar el error
        console.error(error);
      });
  };

  return (
    <div className="absolute w-screen min-h-screen mx-auto flex items-center justify-center bg-black/60">
      <div className="w-[90%] min-h-screen bg-white p-10 rounded-[10px]">
        <div className="w-full flex justify-between mb-2">
          <h1>Datos de archivo de Excel</h1>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 my-auto rounded-md bg-red-500 hover:bg-red-600 text-white w-fit"
              onClick={() => setOpenModalImportExcel(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 my-auto rounded-md bg-blue-500 hover:bg-blue-600 text-white w-fit"
              onClick={saveProductsExcel}
            >
              Guardar productos
            </button>
          </div>
        </div>
        <table className="min-w-full table-auto mb-20 bg-white shadow-lg">
          <thead className="border-b-4 border-bor-red rounded-md">
            <tr className="bg-[#dcffdb]">
              <th className="border px-4 py-2 font-extralight">#</th>
              <th className="border px-4 py-2 font-extralight">Nombre</th>
              <th className="border px-4 py-2 font-extralight">Marca</th>
              <th className="border px-4 py-2 font-extralight">Modelo</th>
              <th className="border px-4 py-2 font-extralight">Color</th>
              <th className="border px-4 py-2 font-extralight">Talla</th>
              <th className="border px-4 py-2 font-extralight">Imagen</th>
              <th className="border px-4 py-2 font-extralight">Precio</th>
            </tr>
          </thead>
          <tbody className="">
            {productsView?.map((arr, index) => (
              <tr
                key={arr?.idProducto}
                className="border-b-4 border-bor-red text-[12px]"
              >
                <td className="text-center px-4 py-2">{index + 1}</td>
                <td className="text-center pt-2 font-medium leading-4 w-[200px]">
                  {arr?.NombreProducto}
                </td>
                <td className="text-center pt-2 font-medium  w-[200px]">
                  {arr?.idMarca}
                </td>
                <td className="text-center pt-2 font-medium  w-[200px]">
                  {arr?.idModelo}
                </td>
                <td className="text-center pt-2 font-medium  w-[200px]">
                  {arr?.idColor}
                </td>
                <td className="text-center pt-2 font-medium  w-[200px]">
                  {arr?.idTalla}
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
                    S/ {arr?.PrecioVentaP}
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImportExcelModal;
