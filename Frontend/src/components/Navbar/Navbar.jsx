
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {

  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [name, setName] = useState();
  const [message, setMessage] = useState();
  const [rol, setRol] = useState()

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:8000')
    .then((res) => {

      console.log(res);

      if (res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.details.name);
        setRol(res.data.details.rol_id)
      } else {
        setAuth(false);
        setMessage(res.data.error);
      }
    })
    .catch(err => console.log(err))
  }, []);

  const handleDeleteCookie = () => {
    axios.get('http://localhost:8000/logout')
    .then(res => {

      if(res.data.Status === 'Success') return navigate('/login')
    }).catch(err => console.log(err))
  }

  return (
    <div>
      <div className="flex justify-between gap-10 px-10 py-2 text-sm bg-[#341044] text-white h-[50px] uppercase font-semibold">
        <ul className="flex gap-10 px-10 py-2">
          <li className="">
            <Link to="/" className="">
              F<strong className="text-red-500">OO</strong>TL
              <strong className="text-red-500">OO</strong>SE
            </Link>
          </li>
          <li className="my-auto">
            <Link to="/">Inicio</Link>
          </li>
        </ul>

        <ul className="flex gap-4 px-10 py-2">
          { rol && rol === 2 && 
          <li className="my-auto">
            <Link to="/dashboard" className="bg-blue-500 p-1 rounded">Dashboard</Link>
          </li>}
          {auth ? (
            <div className="flex gap-10 my-auto py-auto">
              <h1>{name} <FaUser className="inline-block h-[16px] w-[16px]"/> {rol && rol === 2 ? 'administrador' : 'usuario'}</h1>
              <button onClick={handleDeleteCookie} className="px-2 py-auto rounded bg-red-500">SALIR</button>
            </div>
          ) : (
            <>
              <li className="my-auto">
                <Link to="/login" className="bg-red-500 p-1 rounded">Ingresar</Link>
              </li>
              <li className="my-auto">
                <Link to="/register" className="bg-white p-1 rounded text-red-500">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
