const Card = ({ idProducto, NombreProducto, imagen, PrecioVenta }) => {
  return (
    <div className="h-fit relative w-[96%] sm:w-[260px] text-[14px] font-bold rounded-[6px] overflow-hidden hover:shadow-lg hover:cursor-pointer">
      <img
        src={imagen}
        alt="imagen de producto"
        className="h-full w-full hover:scale-x-[-1]"
      />
      <h1 className="mx-2 my-4 text-[#757575] ">{NombreProducto}</h1>
      <div className="flex justify-between">
        <h2 className="mx-2 my-4 text-[14px] sm:text-xl text-[#39144E]">
          S/ {PrecioVenta}
        </h2>
        <div className="relative">
          <h2 className=" mx-2 my-4 text-sm font-extralight text-[#39144E]">
            S/ {parseFloat(((5 / 3) * Number(PrecioVenta)).toFixed(2))}
          </h2>
          <div className="absolute w-[60px] bottom-[33px] right-2 border-t-2 border-[#a1a1a1]"></div>
        </div>
      </div>
      <div className="bg-red-500 absolute top-0 left-0 px-4 py-2 text-white rounded-br-[20px]">
        <h3>-40 %</h3>
      </div>
    </div>
  );
};

export default Card;
