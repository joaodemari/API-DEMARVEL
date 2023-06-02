import { PrismaClient } from "@prisma/client";
import express, { Request, Response, NextFunction } from "express";
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
const port = 8000;

app.use(cors());
app.use(express.json());  

app.get('/', async (req, res) =>{
    const list = await prisma.usuMovie.findMany()
    res.json(list)
});

app.post('/', async (req, res) =>{
    const user = await prisma.usuMovie.create({
        data: {nome: req.body.nome,
        fav_char: req.body.fav_char, 
        fav_movie: req.body.fav_movie}
      })
    res.json(user)
});

app.put('/', async (req, res) => {
  const updateUser = await prisma.usuMovie.update({
    where: {
      id: req.body.id
    },
    data: {
      nome: req.body.nome,
      fav_char: req.body.fav_char,
      fav_movie: req.body.fav_movie
    }
  })
  res.json(updateUser)
});

app.delete('/', async (req, res) => {
  const delUser = await prisma.usuMovie.delete({
    where:{
        id: req.body.id
      }
  })
  res.json(delUser)
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});