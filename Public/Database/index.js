import mongoose from 'mongoose'
import 'dotenv/config.js'

// Connects to a MongoDB client
const mongo = new mongoose.Mongoose({ useUnifiedTopology: true })
mongo.set('useCreateIndex', true)
mongo.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}`
               + `.slhst.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true})

export default mongo