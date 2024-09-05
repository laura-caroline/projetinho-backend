import * as express from 'express'
import * as dotenv from 'dotenv';
import axios from 'axios';

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/healthcheck', (req, res) => {
  try{
    return res.status(204).send('OK'); // Retorna status 200 (OK)
  }
  catch(error){
    return res.status(500).send(error.message); // Retorna status 200 (OK)
  }
})

app.get('/dogs', async (req, res)=> {
  try{
    const response = await axios.get('https://dog.ceo/api/breeds/image/random') 
    console.log(JSON.stringify(response.data))

    const {message: dogImage} = response.data

    res.send(`<img src=${dogImage} alt="random dog" style="max-width: 500px"/>`)
  }
  catch(error){
    console.log(JSON.stringify(error))
    res.status(500).send(error.message); // Retorna status 200 (OK)
  }
})



dotenv.config();

app.listen(3000)