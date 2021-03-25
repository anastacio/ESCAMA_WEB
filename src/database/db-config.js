const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

// ==> Conexão com a Base de Dados:
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Base de Dados conectada com sucesso!");
});

function initializeDB() {
  pool.query(`
  CREATE TABLE IF NOT EXISTS tiles (
    id SERIAL PRIMARY KEY,
    image TEXT,
    name TEXT, 
    description TEXT, 
    address2 TEXT, 
    date TEXT,
    lat TEXT, 
    lon TEXT, 
    regions TEXT,
    types TEXT
    );
  `);
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  initializeDB,
};
