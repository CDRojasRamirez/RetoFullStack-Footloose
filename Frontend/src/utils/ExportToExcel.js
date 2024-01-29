import ExcelJS from 'exceljs'

export const exportToExcel = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Productos");

    worksheet.properties.defaultRowHeight = 20

    worksheet.columns = [
        {
            header: 'Id',
            key: 'id',
            width: 10
        },
        {
            header: 'Nombre',
            key: 'nombre',
            width: 10
        },
        {
            header: 'Marca',
            key: 'marca',
            width: 10
        },
        {
            header: 'Modelo',
            key: 'modelo',
            width: 10
        },
        {
            header: 'Color',
            key: 'color',
            width: 10
        },
        {
            header: 'Talla',
            key: 'talla',
            width: 10
        },
        {
            header: 'Imagen',
            key: 'imagen',
            width: 10
        },
        {
            header: 'Precio',
            key: 'precio',
            width: 10
        },
    ]

    // Data
    data?.map((product) => {
      worksheet?.addRow({
        id: product?.idProducto,
        nombre: product?.NombreProducto,
        marca: product?.marca?.NombreMarca,
        modelo: product?.modelo?.NombreModelo,
        color: product?.color?.NombreColor,
        talla: product?.talla?.NombreTalla,
        imagen: product?.imagen,
        precio: product?.PrecioVenta,
    });
    });

    // Guardar el archivo
    workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet'
        });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = 'productos.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url)

    })
  };