const express = require('express')
const app = express()

app.use(express.json())

let autoIncrementNextValue = 1

function autoIncrement() {
  return autoIncrementNextValue++
}

const birdsDB = [
  {
    id: autoIncrement(),
    name: 'Aquatic warbler',
    scientificName: 'Acrocephalus paludicola',
    birdFamily: 'Warblers'
  },
  {
    id: autoIncrement(),
    name: 'Segde warbler',
    scientificName: 'Acrocephalus schoenobaenus',
    birdFamily: 'Warblers'
  },
  {
    id: autoIncrement(),
    name: 'Arctic skua',
    scientificName: 'Stercorarius parasiticus',
    birdFamily: 'Skuas'
  },
  {
    id: autoIncrement(),
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
  const body = req.body
  let bird = null
  let message = "Request body did not match specification"

  let status = 400
  if (
    body.name &&
    body.scientificName &&
    body.birdFamily
  ) {
    message = 'Success'
    status = 201
    bird = {
      id: autoIncrement()
      name: body.name,
      scientificName: body.scientificName,
      birdFamily: body.birdFamily
    }

    birdsDB.push(bird)
  }

  res.status(status).send({message: message, data: bird})
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
  const body = req.body

  const response = {message: 'Request body did not match specification'}
  let status = 400

  let isRequestBodyValid = false
  if (
    body.name &&
    body.scientificName &&
    body.birdFamily
    
  ) {
    isRequestBodyValid = true

    response.message = 'Not found'
    status = 404
  }
  
  const birdIndex = birdsDB.findIndex(bird => bird.id === Number(id))
  if (
    birdIndex >= 0 &&
    isRequestBodyValid
  ) {
    status = 200

    const birdFound = birdsDB[birdIndex]
    const birdResponse = {
      id: birdFound.id,
      name: body.name,
      scientificName: body.scientificName,
      birdFamily: body.birdFamily
    }
    
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
