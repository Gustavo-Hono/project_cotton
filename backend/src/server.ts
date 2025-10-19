import 'dotenv/config';
import express, { Request, Response } from "express";
import authRouter from './Routes/auth.router';
import fardsRouter from './Routes/fards.router';
import usersRouter from './Routes/user.router';
import movimentationRouter from './Routes/movimentation.router';
import stepsRouter from './Routes/steps.router';
import perfilRouter from './Routes/perfil.router';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:8080',          // seu front
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
  })
);


app.use("/auth", authRouter)
app.use("/users", usersRouter)
app.use("/fards", fardsRouter)
app.use("/movimentations", movimentationRouter)
app.use("/steps", stepsRouter)
app.use("/perfils", perfilRouter)

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})