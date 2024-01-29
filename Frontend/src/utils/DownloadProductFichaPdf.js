import jsPDF from 'jspdf'

export const handleDownloadFicha = async (data) => {
    try {
      // Crear instancia de jsPDF
      const pdf = new jsPDF();
  
      // Añadir logo en la parte superior
      const logoUrl = "data:image/png;base64,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"; // Reemplaza con la URL de tu logo
      const logoWidth = 40;
      const logoHeight = 15;
      pdf.addImage(logoUrl, "JPEG", 10, 10, logoWidth, logoHeight);
  
      // Añadir título
      pdf.setFontSize(16);
      pdf.text("Ficha Técnica de Producto", 70, 35);
  
      // Añadir texto al PDF
      pdf.setFontSize(12);
  
      // Nombre
      pdf.setFillColor(200, 220, 255); // Color del cuadro
      pdf.rect(10, 50, 60, 10, 'F'); // Cuadro para el nombre
      pdf.text("Nombre", 32, 56);
      const nombreLines = pdf.splitTextToSize(data?.NombreProducto, 120);
      pdf.text(nombreLines, 80, 55);
  
      // Marca
      pdf.setFillColor(200, 220, 255); // Color del cuadro
      pdf.rect(10, 70, 60, 10, 'F'); // Cuadro para la marca
      pdf.text("Marca", 32, 76);
      pdf.text(data?.marca?.NombreMarca, 80, 75);
  
      // Modelo
      pdf.setFillColor(200, 220, 255); // Color del cuadro
      pdf.rect(10, 90, 60, 10, 'F'); // Cuadro para el modelo
      pdf.text("Modelo", 32, 96);
      pdf.text(data?.modelo?.NombreModelo, 80, 95);
  
      // Color
      pdf.setFillColor(200, 220, 255); // Color del cuadro
      pdf.rect(10, 110, 60, 10, 'F'); // Cuadro para el color
      pdf.text("Color", 32, 116);
      pdf.text(data?.color?.NombreColor, 80, 115);
  
      // Talla
      pdf.setFillColor(200, 220, 255); // Color del cuadro
      pdf.rect(10, 130, 60, 10, 'F'); // Cuadro para la talla
      pdf.text("Talla", 32, 136);
      pdf.text(data?.talla?.NombreTalla, 80, 135);
  
      // Precio
      pdf.setFillColor(200, 220, 255); // Color del cuadro
      pdf.rect(10, 150, 60, 10, 'F'); // Cuadro para el precio
      pdf.text("Precio", 32, 156);
      pdf.text(`S/ ${data?.PrecioVenta}`, 80, 155);
  
      // Cuadro para la imagen
      pdf.setFillColor(200, 220, 255); // Color del cuadro
      pdf.rect(10, 170, 60, 10, 'F'); // Cuadro para la imagen
      pdf.text("Imagen", 32, 176);
  
      // Añadir imagen al PDF (asegúrate de ajustar las coordenadas y el tamaño)
      const imageUrl = data?.imagen;
      const imageWidth = 60;
      const imageHeight = 60;
      pdf.addImage(imageUrl, "JPEG", 80, 175, imageWidth, imageHeight);
  
      pdf.save(`Ficha_Producto_${data?.idProducto}.pdf`);
    } catch (error) {
      console.error("Error al descargar la ficha del producto:", error);
    }
  };