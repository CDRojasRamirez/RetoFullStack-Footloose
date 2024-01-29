import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Card/Card";

const Cards = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/products")
      .then(({ data }) => {
        setProducts(data?.productos);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 max-w-[1400px] mx-2 sm:mx-auto lg:mx-24 mb-2">
      {products?.map((i) => (
        <div key={i?.idProducto}>
          <Card
            idProducto={i?.idProducto}
            NombreProducto={i?.NombreProducto}
            imagen={i?.imagen}
            PrecioVenta={i?.PrecioVenta}
          />
        </div>
      ))}
    </div>
  );
};

export default Cards;
