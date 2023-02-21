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

app.put('/birds/:id', (req, res) => {
  const id = req.params.id
  const birdIndex = birdsDB.findIndex(bird => bird.id === Number(id))
  
  const response = {message: 'Not found'}
  let status = 404
  if (birdIndex >= 0) {
    status = 200

    const birdFound = birdsDB[birdIndex]
    const birdResponse = {...req.body, id: birdFound.id}
    
    birdsDB[birdIndex] = birdResponse

    response.message = 'Succes'
    response.data = birdResponse
  }

  res.status(status).send(response)
})

app.delete('/birds/:id', (req, res) => {
  const id = req.params.id
  const birdIndex = birdsDB.findIndex(bird => bird.id === Number(id))

  const response = {message: 'Not found'}
  let status = 400
  if (birdIndex >= 0) {
    status = 200
    response.message = 'Success'

    birdsDB.splice(birdIndex, 1)
  }

  res.status(status).send(response)
})

app.listen(8080, () => console.log('Listening on port 8080'))
