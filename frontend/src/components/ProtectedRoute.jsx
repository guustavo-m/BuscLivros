import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({ tipo }) {
  const { autenticado, usuario } = useAuth();

  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  if (tipo && usuario?.tipo !== tipo) {
    if (usuario?.tipo === "admin") {
      return <Navigate to="/home-admin" replace />;
    }
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}