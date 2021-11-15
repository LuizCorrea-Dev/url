import express from 'express'
require('dotenv').config()
import { URLController } from './controller/URLController'
import { MongoConnection } from './database/MongoConnection'

const ApiURL = process.env.API_URL

const api = express()
api.use(express.json())

const database = new MongoConnection()
database.connect()

const urlController = new URLController()
api.post('/shorten', urlController.shorten)
api.get('/:hash', urlController.redirect)

api.listen(5000, () => {
  console.log(`exe in ${ApiURL}`)
}
  
)
