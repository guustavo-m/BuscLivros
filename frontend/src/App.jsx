import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import HomeUsuario from "./components/HomeGeral";
import Administrador from "./pages/Painel";
import ProtectedRoute from "./components/ProtectedRoute"; 
import DetalheItem from "./pages/DetalheItem";
import PesquisarLivros from "./pages/PesquisarLivros";
import ItemCard from "./components/ItemCard";

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
            element={<HomeUsuario />}
          />
          <Route
            path="/administrador"
            element={<Administrador />}
        />

           <Route
            path="/pesquisar"
          element={<PesquisarLivros />}
        />

        <Route
          path="/livro/:id"
          element={<DetalheItem />}
        />
        <Route
          path="/item/:id"
          element={<ItemCard />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}