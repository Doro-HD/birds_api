const { v4: uuidv4 } = require('uuid')

const express = require('express')
const app = express()

const uuid1 = uuidv4()
const uuid2 = uuidv4()
const uuid3 = uuidv4()
const uuid4 = uuidv4()

const birdsDB = {
  uuid1: {
    name: 'Aquatic warbler',
    scientificName: 'Acrocephalus paludicola',
    birdFamily: 'Warblers',
    wingSpand: 16.5
  },
  uuid2: {
    name: 'Segde warbler',
    scientificName: 'Acrocephalus schoenobaenus',
    birdFamily: 'Warblers',
    wingSpand: 17    
  },
  uuid3: {
    name: 'Arctic skua',
    scientificName: 'Stercorarius parasiticus',
    birdFamily: 'Skuas',
    wingSpand: 110
    
  },
  uuid4: {
    name: 'Long-tailed skua',
    scientificName: 'Stercorarius longicaudus',
    birdFamily: 'Skuas',
    wingSpand: 105
    
  }
}


app.listen(8080)