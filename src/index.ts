import { prisma } from "../prisma/database"
import * as express from 'express'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', function (req, res) {
  res.send('Hello World')
})

app.post('/api/product', async (req, res) => {
  try{
    const {title, content} = req.body
    const product = await prisma.post.create({data: {title, content}})
    return res.status(201).json(product); 
  }
  catch(err){
    console.log(err)
    return res.status(500).json({ error: 'Internal server error' });
  }
  
})
app.get('/api/product', async (req, res) => {
  try{
    const products = await prisma.post.findMany()
    return res.status(201).json(products); 

  }
  catch(err){
    console.log(err)
    res.status(500).json({ error: 'Internal server error' });

  }
})

app.listen(3000)