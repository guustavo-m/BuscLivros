const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM usuarios ORDER BY id'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { nome, email, senha } = dados;

  const sql = `
    INSERT INTO usuarios (nome, email, senha)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, email, senha]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { nome, email, senha } = dados;
  
  const sql = `
    UPDATE usuarios
    SET nome = $1, email = $2, senha = $3
    WHERE id = $4
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nome, email, senha, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM usuarios WHERE id = $1',
    [id]
  );

  return result.rowCount > 0;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
