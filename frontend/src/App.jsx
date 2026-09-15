import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import HomeGeral from "./components/HomeGeral";
import HomeAdmin from "./pages/HomeAdmin";
import Administrador from "./pages/Painel";
import ProtectedRoute from "./components/ProtectedRoute";
import DetalheItem from "./pages/DetalheItem";
import PesquisarLivros from "./pages/PesquisarLivros";
import ItemCard from "./components/ItemCard";
import CadastroLivros from './pages/Cadastrolivros'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<HomeGeral />}
        />

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

        <Route element={<ProtectedRoute tipo="admin" />}>
          <Route
            path="/home-admin"
            element={<HomeAdmin />}
          />

          <Route
            path="/administrador"
            element={<Administrador />}
          />

          <Route
            path="/cadastro-livro"
            element={<CadastroLivros />}
          />

          <Route
            path="/editar-livro/:id"
            element={<CadastroLivros />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
