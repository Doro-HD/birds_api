const express = require('express')
const app = express()

app.use(express.json())

let autoIncrementNextValue = 1

const birdsDB = [
  {
    id: autoIncrementNextValue++,
    name: 'Aquatic warbler',
    scientificName: 'Acrocephalus paludicola',
    birdFamily: 'Warblers'
  },
  {
    id: autoIncrementNextValue++,
    name: 'Segde warbler',
    scientificName: 'Acrocephalus schoenobaenus',
    birdFamily: 'Warblers'
  },
  {
    id: autoIncrementNextValue++,
    name: 'Arctic skua',
    scientificName: 'Stercorarius parasiticus',
    birdFamily: 'Skuas'
  },
  {
    id: autoIncrementNextValue++,
    name: 'Long-tailed skua',
    scientificName: 'Stercorarius longicaudus',
    birdFamily: 'Skuas'
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

app.post('/birds', (req, res) => {
  const bird = {id: autoIncrementNextValue++, ...req.body}
  birdsDB.push(bird)

  res.status(200).send(bird)
})

app.get('/birds/:id', (req, res) => {
  const id = req.params.id
  const bird = birdsDB.find(bird => bird.id === Number(id))  

  let status = 200
  if (bird === undefined) {
    status = 404
  }
  
  res.status(status).send({data: bird})
})

app.listen(8080, () => console.log('Listening on port 8080'))
