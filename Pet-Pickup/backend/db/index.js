const { Client } = require('pg');

const client = new Client({
  user: 'gmckonzvgsnkda',
  password: 'f13c9cdb4b9e264632ca3b306f361875af053a5778ae04be43a654b1f8669ead',
  host: 'ec2-54-225-129-101.compute-1.amazonaws.com',
  port: '5432',
  database: 'd3e61ki7sm6ld6',
  ssl: true
});



client.connect()
  .then(() => {
    console.log('Connected to Database!!!')
  })
  .catch((e) => {
    console.log('Error Connecting to Database!! ' + e)
  })

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  }
}
