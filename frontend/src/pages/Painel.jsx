import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Administrador() {
  const pedidos = [
    { nome: "Ayla Cristina da Silva Vilela", email: "aylasilva@gmail.com" },
    { nome: "Manuella Piva", email: "manupiv@gmail.com" },
    { nome: "Maria Vitória", email: "mariavitoria@gmail.com" },
  ];

  const cadastros = [
    { nome: "Ayla Cristina da Silva Vilela", email: "aylasilva@gmail.com" },
    { nome: "Manuella Piva", email: "manupiv@gmail.com" },
    { nome: "Maria Vitória", email: "mariavitoria@gmail.com" },
    { nome: "Gustavo Milamonte", email: "gustavomilamonte@gmail.com" },
    { nome: "Gabriella Stavarenago", email: "gabriellastavarenago@gmail.com" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <Footer />
    </div>
  );
}
