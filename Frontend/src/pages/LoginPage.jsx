import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
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

        console.log('estoy aqui');

        axios.post('http://localhost:8000/login', formData, { withCredentials: true })
        .then(res => {
          
          console.log(res);

            if(res.data.Status === 'Success'){
                navigate('/')
            } else {
                console.log(res);
                alert(res.data.Error)
            }
        })
        .then(err => console.log(err))

        console.log('estoy aqui')
    }

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-start">
      <div className="relative w-full h-[80px] lg:w-1/2 lg:h-full flex flex-col">
        <div className="absolute top-[20%] left-[10%] sm:top-[55%] lg:top-[25%] sm:left-[30%] lg:left-[10%] flex flex-col text-white bg-black/20 lg:bg-transparent p-2 rounded">
          <h1 className="text-2xl font-bold my-0 lg:my-2">
            FOOTLOSE ES EL CAMINO.
          </h1>
          <p className="text-[10px] lg:text-xl">
            Inspiramos humildad, felicidad y orgullo en cada
            uno de sus pasos.
          </p>
        </div>
        <img
          src="/assets/photo-login.jpeg"
          alt="portada-login"
          className="w-full h-[100px] sm:h-[150px] object-cover object-bottom lg:w-full lg:h-full lg:object-cover"
        />
      </div>

      <div className="w-full lg:w-1/2 h-full bg-[#f5f5f5] flex flex-col p-4 sm:p-10 justify-between text-normal items-center mt-0 sm:mt-10 lg:mt-0">
        <h1 className="text-base text-[#42006A] font-semibold my-4 sm:my-0">
          Continúa tu experiencia en Footloose
        </h1>

        <form action="" onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center max-w-[500px] mx-auto bg-black/5 shadow-md p-10 rounded-lg">

        <div className="w-full flex flex-col mb-10">
          <h3 className="text-2xl font-semibold mb-2">¡Hola otra vez! 👋</h3>
          <p className="text-sm">
            Por favor, ingresa tus datos.
          </p>
        </div>

          <input
            type="email"
            placeholder="Correo"
            name='email'
            onChange={handleChange}
            value={formData?.email}
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
          />

          <input
            type="password"
            placeholder="Contraseña"
            name='password'
            onChange={handleChange}
            value={formData?.password}
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
          />

            <div className="w-full flex flex-col my-4">
                <button type="submit" className="w-full text-white bg-[#060606] rounded-md p-4 text-center flex items-center justify-center">
                    Iniciar sesión
                </button>
                <Link to={'/register'} className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center">
                    Regístrate
                </Link>
            </div>
            

        </form>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#42006A]">
          ¿No tienes una cuenta?{" "}
            <Link to={'/register'} className="font-semibold underline underline-offset-2 cursor-pointer">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
