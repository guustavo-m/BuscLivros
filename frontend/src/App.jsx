import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./components/HomeGeral";
import Administrador from "./pages/Painel";
import ProtectedRoute from "./components/ProtectedRoute"; 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/cadastro"
          element={<Cadastro />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/administrador"
            element={<Administrador />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}