import express, { Request, Response } from "express";
import router from "./Routes/user.router";

const app = express();

app.use(express.json())
app.use(router)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})