const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    //await db.connect();
    console.log('here');
    const { rows } = await db.query('SELECT * FROM person')
  res.send(rows)
  }
  catch(e) {
    console.log(`Something wrong happened! ${e}`);
  }
  finally {
    //await client.end();
    console.log('Client Disconnected!');
  }
});
