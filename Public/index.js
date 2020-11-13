import express from 'express'
import bodyparser from 'body-parser'
import controllers from './Controllers/index.js'

// Configurable Variables
const Port = 3000

// Express Setup
const app = express()
app.use( bodyparser.json() )
app.use( bodyparser.urlencoded( {extended: false} ) )

// Import functions 
controllers(app)

// Running the server
app.listen(Port)