import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    console.log(formData);

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/register', formData)
        .then(res => {
            if(res.data.Status === 'Success'){
                navigate('/login')
            }

            console.log(res);
        })
        .then(err => console.log(err))
    }
  
    return (
      <div className="w-full h-screen flex flex-col lg:flex-row items-start">
        <div className="relative w-full h-[80px] lg:w-1/2 lg:h-full flex flex-col">
          <div className="absolute top-[20%] left-[10%] sm:top-[55%] lg:top-[75%] sm:left-[30%] lg:left-[10%] flex flex-col text-white bg-black/20 lg:bg-transparent p-2 rounded">
            <h1 className="text-2xl font-bold my-0 lg:my-2">
              INGRESA A UN NUEVO MUNDO.
            </h1>
            <p className="text-[10px] lg:text-xl">
              Inspiramos humildad, felicidad y orgullo en cada
              uno de sus pasos.
            </p>
          </div>
          <img
            src="https://img.freepik.com/foto-gratis/chica-pelirroja-tatuada-ropa-moda-sentada-escaleras-afuera_613910-17935.jpg?w=996&t=st=1706204843~exp=1706205443~hmac=1ac920393dbdfbf69ec261c7acb2189dfbea9ef9a7ac426e29e49942d70b5e29"
            alt="portada-register"
            className="w-full h-[100px] sm:h-[150px] object-cover object-bottom lg:w-full lg:h-full lg:object-cover"
          />
        </div>
  
        <div className="w-full lg:w-1/2 h-full bg-[#f5f5f5] flex flex-col p-4 sm:p-10 justify-between text-normal items-center mt-0 sm:mt-10 lg:mt-0">
          <h1 className="text-base text-[#42006A] font-semibold my-4 sm:my-0">
            Mejora tu experiencia en Footloose
          </h1>
  
          <form action="" onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center max-w-[500px] mx-auto bg-black/5 shadow-md p-10 rounded-lg">
  
          <div className="w-full flex flex-col mb-10">
            <h3 className="text-2xl font-semibold mb-2">¡Únete a nosotros! ✊</h3>
            <p className="text-sm">
              Por favor, completa los campos.
            </p>
          </div>
  
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
  
            <input
              type="email"
              placeholder="Correo"
              name="email"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              value={formData?.email}
              onChange={handleChange}
            />
  
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              value={formData?.password}
              onChange={handleChange}
           />
  
              <div className="w-full flex flex-col my-4">
                  <button className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center">
                      Registrarse
                  </button>
                  <Link to={'/login'} className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center">
                    Iniciar sesión
                  </Link>
              </div>
              
  
          </form>
  
          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-normal text-[#42006A]">
            ¿Ya tienes una cuenta?{" "}
              <Link to={'/login'} className="font-semibold underline underline-offset-2 cursor-pointer">
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default RegisterPage;
  