import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/HomeTest";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}