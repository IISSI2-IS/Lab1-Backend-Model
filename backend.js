const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const helmet = require('helmet')
const { Sequelize } = require('sequelize')

const app = express() // crear una app express
app.use(express.json()) // parser de requests body como json
app.use(cors()) // habilita peticiones desde otro dominio
app.use(helmet()) // seguridad general en servicios REST

const databaseHost = process.env.DATABASE_HOST
const databasePort = process.env.DATABASE_PORT
const databaseUsername = process.env.DATABASE_USERNAME
const databasePassword = process.env.DATABASE_PASSWORD
const databaseName = process.env.DATABASE_NAME

const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
  host: databaseHost,
  port: databasePort,
  dialect: 'mariadb'
})

sequelize.authenticate()
  .then(() => {
    console.info('INFO - Database connected.')
    const port = process.env.APP_PORT
    return app.listen(port)
  })
  .then((server) => {
    console.log('Deliverus listening at http://localhost:' + server.address().port)
  })
  .catch(err => {
    console.error('ERROR - Unable to connect to the database:', err)
  })
