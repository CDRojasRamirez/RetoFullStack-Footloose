import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { useHref } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar/Navbar';
import DashPrincipalPage from './pages/DashPrincipalPage';
import Footer from './components/Footer/Footer';

function App() {

  const url = useHref()

  return (
    <div className='min-h-screen w-screen bg-white overflow-hidden'>

      <div>
        { url !== '/login' && url !== '/register' && url !== '/dashboard' && <Navbar /> }
        
         <Routes>
                        <Route
                            exact
                            path="/"
                            element={<HomePage />}
                        ></Route>
                        <Route
                            exact
                            path="/dashboard"
                            element={<DashPrincipalPage />}
                        ></Route>
                        <Route
                            exact
                            path="/login"
                            element={<LoginPage />}
                        ></Route>
                        <Route
                            exact
                            path="/register"
                            element={<RegisterPage />}
                        ></Route>
                    </Routes>

                    { url !== '/login' && url !== '/register' && url !== '/dashboard' && <Footer /> }
      </div>

    </div>
  )
}

export default App;
