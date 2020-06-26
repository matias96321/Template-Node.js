
const config = require('../config/configs')
const Sequelize = require('sequelize')

const connection = new Sequelize(config)

module.exports = { 
    Sequelize: Sequelize,
    connection: connection
}