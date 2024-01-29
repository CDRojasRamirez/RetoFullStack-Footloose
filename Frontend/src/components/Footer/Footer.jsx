import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center text-[#3E1151] bg-[#ECE6F2] pt-[2rem] lg:pt-[5rem] text-[1rem]">
      <div className="grid sm:grid-cols-4 mx-10 lg:mx-20 gap-10 sm:gap-40">
        <div className="footer-1">
          <Link href={"/"} className="flex flex-col gap-4 max-w-[180px]">
            <h1 className="text-2xl font-bold">F<nav className="text-red-500 inline-block">OO</nav>TL<nav className="text-red-500 inline-block">OO</nav>SE</h1>
            <h2>Los mejores en calzados de alta calidad.</h2>
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-bold">Enlaces</h4>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to={"/"}>Inicio</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-bold">Primacy</h4>
          <ul className="flex flex-col gap-4">
            <li>
              <Link target="_blank" href={""}>
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xl font-bold">Contacto</h4>
          <div className="flex flex-col gap-4">
            <p className="sm:text-[10px] lg:text-[16px]">footloose@gmail.com</p>
          </div>

          <h4 className="text-xl font-bold">Redes sociales</h4>
          <ul className="socials flex gap-2">
            <li>
              <Link
                target="_blank"
                href={"https://www.instagram.com/"}
                className="flex gap-1"
              >
                <h1>IG</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-[4rem] py-[0.8rem] mx-auto border-t border-slate-500 w-screen">
        <small>Copyright &copy; Fooloose 2024</small>
      </div>
    </footer>
  );
};

export default Footer;
