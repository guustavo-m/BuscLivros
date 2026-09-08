import { useAuth } from "../context/useAuth";

export default function HomeTest() {
  const { usuario, fazerLogout } = useAuth();
  return (
    <main>
      <h1>
        Olá, {usuario?.nome}!
      </h1>
      <button onClick={fazerLogout}>
        Sair
      </button>
    </main>
  );
}