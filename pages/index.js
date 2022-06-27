import { useEffect, useState } from "react";
import Home from "../componentes/home";
import Login from "../componentes/Login";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService()
export default function Index() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticado()
    );
  }, []);

  if (estaAutenticado) {
    return <Home />
  }
  
  return <Login aposAutenticacao={() => setEstaAutenticado(true)} />;
}
