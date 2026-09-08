const pool = require('../config/database');

async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM livros ORDER BY id'
  );
  return result.rows;
}

async function buscarPorId(id) {
  // PostgreSQL usa $1, $2, $3... como placeholders
  // (SQLite usava ? ? ?)
  const result = await pool.query(
    'SELECT * FROM livros WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

async function criar(dados) {
  const { titulo, ano, editora, autor, imagem, descricao, paginas, categoria, nota } = dados;

  const sql = `
    INSERT INTO livros (titulo, ano, editora, autor, imagem, descricao, paginas, categoria, nota)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [titulo, ano, editora, autor, imagem, descricao, paginas, categoria, nota]
  );
  
  return result.rows[0];
}

async function atualizar(id, dados) {
  const { titulo, ano, editora, autor, imagem, descricao, paginas, categoria, nota } = dados;
  
  const sql = `
    UPDATE livros
    SET titulo = $1, ano = $2, editora = $3, autor = $4, imagem = $5, descricao = $6, paginas = $7, categoria = $8, nota = $9
    WHERE id = $10
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [titulo, ano, editora, autor, imagem, descricao, paginas, categoria, nota, id]
  );
  
  return result.rows[0] || null;
}

async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM livros WHERE id = $1',
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
