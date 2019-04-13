const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios')
const parser = require('body-parser')
const cors = require('cors');

app.use(cors());

app.use ('/:id',express.static(path.join(__dirname, 'public')));
app.use(parser.json())


app.get(`/host/:id`, (req, res) => {
  let id = (req.params.id)
  axios.get(`http://ec2-18-204-209-186.compute-1.amazonaws.com/host/${id}`)
    .then((result)=>res.send(result.data))
    .catch((err)=> console.error(err))
})


app.get('/find/:address', (req, res)=>{
  let address = (req.params.address.split('+').join(' '));
  axios.get(`http://ec2-18-204-209-186.compute-1.amazonaws.com/find/${address}`)
  .then((result)=>res.send(result.data))
  .catch((err)=> console.error(err))
})



app.get('/contact/:host',  (req, res)=>{
  let host = (req.params.host.split('%').join(' '))
  axios.get(`http://ec2-18-204-209-186.compute-1.amazonaws.com/contact/${host}`)
  .then((result)=>res.send(result.data))
  .catch((err)=> console.error(err))
})

app.post('/contact/:host/message', (req, res)=>{
  let host = (req.params.host.split('%').join(' '))
  axios.post(`http://ec2-18-204-209-186.compute-1.amazonaws.com/${host}/message`)
  .then(()=>res.sendStatus(201))
  .catch((err)=> console.error(err))
})



app.get('/contact/:host/message', (req, res) => {
  let host = req.params.host.split(' ').join('+')
  axios.get(`http://ec2-18-204-209-186.compute-1.amazonaws.com/${host}/message`)
  .then((data)=>res.send(data.data))
  // res.json(data))
  .catch((err)=> console.error(err))
})


app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});