export default function Administrador() {
  const pedidos = [
    { nome: "Ayla Cristina da Silva Vilela", email: "aylinha.vilelinha@gmail.com" },
    { nome: "Manuella Piva", email: "manu.gameplay@gmail.com" },
    { nome: "Maria Vitória", email: "mariavitoria@gmail.com" },
  ];

  const cadastros = [
    { nome: "Ayla Cristina da Silva Vilela", email: "aylinha.vilelinha@gmail.com" },
    { nome: "Manuella Piva", email: "manu.gameplay@gmail.com" },
    { nome: "Maria Vitória", email: "mariavitoria@gmail.com" },
    { nome: "Gustavo Milamonte", email: "gustavomilamonte@gmail.com" },
    { nome: "Gabriella Stavarenago", email: "gabriellastavarenago@gmail.com" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-8">
        <div className="mx-auto mb-6 max-w-md rounded-xl bg-orange-500 py-2 text-center">
          <h1 className="font-serif text-lg text-black">Painel Admin</h1>
        </div>

        <div className="mx-auto mb-9 flex max-w-lg justify-center gap-10">
          <div className="flex h-20 w-28 flex-col items-center justify-center rounded-lg border border-gray-500">
            <span className="font-serif text-xl">7</span>
            <span className="text-xs">Contas Cadastradas</span>
          </div>

          <div className="flex h-20 w-28 flex-col items-center justify-center rounded-lg border border-gray-500">
            <span className="font-serif text-xl">0</span>
            <span className="text-center text-xs">Aguardando Aprovação</span>
          </div>
        </div>

        <section className="mx-auto max-w-2xl">
          <div className="rounded-lg border border-orange-900 px-2 pb-2">
            <h2 className="mb-2 text-center font-serif text-sm">
              Pedidos em aguardo
            </h2>

            <div className="space-y-2">
              {pedidos.map((pedido, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-orange-900 px-2 py-2"
                >
                  <div>
                    <p className="font-serif text-sm">{pedido.nome}</p>

                    <p className="text-xs text-gray-400">{pedido.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex h-5 w-14 items-center justify-center rounded-full border border-green-700 text-xs text-green-500 hover:bg-green-900">
                      Aceitar
                    </button>

                    <button className="flex h-5 w-14 items-center justify-center rounded-full border border-red-700 text-xs text-red-500 hover:bg-red-900">
                      Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto mt-4 max-w-2xl">
          <h2 className="mb-1 font-serif text-sm text-gray-900">
            Aguardando Aprovação
          </h2>

          <div className="rounded-lg border border-orange-900 px-2 pb-2">
            <h2 className="mb-2 text-center font-serif text-sm">Cadastros</h2>

            <div className="space-y-1">
              {cadastros.map((cadastro, index) => (
                <div
                  key={index}
                  className="rounded-md border border-orange-900 px-2 py-2"
                >
                  <p className="font-serif text-sm">{cadastro.nome}</p>

                  <p className="text-xs text-gray-400">{cadastro.email}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
