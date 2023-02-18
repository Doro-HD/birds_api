const express = require('express')
const app = express()

const birdsDB = [
  {
    id: '1',
    name: 'Aquatic warbler',
    scientificName: 'Acrocephalus paludicola',
    birdFamily: 'Warblers',
    wingSpand: 16.5
  },
  {
    id: '2',
    name: 'Segde warbler',
    scientificName: 'Acrocephalus schoenobaenus',
    birdFamily: 'Warblers',
    wingSpand: 17    
  },
  {
    id: '3',
    name: 'Arctic skua',
    scientificName: 'Stercorarius parasiticus',
    birdFamily: 'Skuas',
    wingSpand: 110
  },
  {
    id: '4',
    name: 'Long-tailed skua',
    scientificName: 'Stercorarius longicaudus',
    birdFamily: 'Skuas',
    wingSpand: 105
  }
]

app.get('/birds', (req, res) => {
  const birdFamily = req.query.birdFamily
  let birds = birdsDB
  
  if (birdFamily) {
    birds = birds.filter(bird => bird.birdFamily === birdFamily)
  }
  
  res.send({data: birds})
})

app.get('/birds/:id', (req, res) => {
  const id = req.params.id
  const bird = birdsDB.find(bird => bird.id === id)  

  let status = 200
  if (bird === undefined) {
    status = 404
  }
  
  res.status(status).send({data: bird})
})

app.listen(8080, () => console.log('Listening on port 8080'))
