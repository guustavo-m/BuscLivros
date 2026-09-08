import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Administrador from "./pages/Painel";
import HomeTest from "./pages/HomeTest"
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
            element={<HomeTest />}
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