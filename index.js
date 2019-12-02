// in Node.js we'll import files using this syntax
const express = require('express'); //CommonJS Modules

const db = require('./data/hubs-model.js'); //1: import the database file

const server = express();

server.use(express.json()); //this is needed to parse JSON from the body

server.get('/', (req, res) => {
  res.send({ api: 'up and running...' })
})

//list of hubs GET /hubs 2: implement endpoint
server.get('/hubs', (req, res) => {
  // get the list of hubs from the database
  db.find()
  .then(hubs => {
    res.status(200).json(hubs);
  })
  .catch(error => {
    console.log('error on GET /hub', error);
    res.status(500).json({ errorMessage: 'error getting list of hubs from database'})
  })
})

// add a hub
server.post('/hubs', (req, res) => {
  // get the data the client sent
  const hubData = req.body; //express does not know how to parse JSON

  // call the db and add the hub
  db.add(hubData)
  .then(hub => {
    res.status(201).json(hub);
  })
  .catch(error => {
    console.log('error on GET /hub', error);
    res.status(500).json({ errorMessage: 'error getting list of hubs from database'})
  })
})

// delete a hub
server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
  .then(removed => {
    if(removed) {
      res.status(200).json({ message: 'hubs removed successfully' })
    } else {
      res.status(404).json({ message: 'hub not found' })
    }
  })
  .catch(error => {
    console.log('error on DELETE /hub:id', error);
    res.status(500).json({ errorMessage: 'error getting list of hubs from database'})
  })
})

const port = 4000;
server.listen(port, () => console.log(`\n ** API running on port ${port} ** \n `))

console.log('node.js ran')