import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import { AuthProvider } from './context/AuthProvider';
import Clients from './pages/Clients/Clients';
import Footer from "./components/Footer/Footer";
import Departamentos from "./pages/Departamentos/Departamentos";
import Reservas from "./pages/Reservas/Reservas";
import Informes from "./pages/Informes/Informes";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/clients" element={<Clients />} />
          <Route path="/departamentos" element={<Departamentos />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/informes" element={<Informes />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
