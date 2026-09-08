const API_URL = 'http://localhost:3000';

export async function login(email, senha) {
  const resposta = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      email,
      senha
    })
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao fazer login');
  }
  return dados;
}

export async function cadastro(nome, email, senha) {
  const resposta = await fetch(`${API_URL}/api/auth/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome,
      email,
      senha
    })
  });

  const dados = await resposta.json();
  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao realizar cadastro');
  }
  return dados;
}

export async function requisicaoProtegida(url, opcoes = {}) {
  const token = localStorage.getItem("token");

  const resposta = await fetch(url, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...opcoes.headers,
      Authorization: `Bearer ${token}`
    }
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      dados.mensagem || "Erro na requisição"
    );
  }

  return dados;
}