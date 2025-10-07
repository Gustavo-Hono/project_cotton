import 'dotenv/config';
import pg from 'pg';


console.log("--------------------------------------")

const db = new pg.Client ({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

db.connect()
  .then(() => console.log("Conectado ao banco!"))
  .catch((err) => {
    console.error("Conexão falhou:", err);
    console.log(typeof(process.env.DB_PASSWORD))
    process.exit(1);
  });

export default db;