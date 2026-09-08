import { createContext, useState } from "react";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo
      ? JSON.parse(usuarioSalvo)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  function fazerLogin(dados) {
    setToken(dados.token);
    setUsuario(dados.usuario);
    localStorage.setItem("token", dados.token);
    localStorage.setItem(
      "usuario",
      JSON.stringify(dados.usuario)
    );
  }

  function fazerLogout() {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

  const autenticado = !!token;

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        autenticado,
        fazerLogin,
        fazerLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}