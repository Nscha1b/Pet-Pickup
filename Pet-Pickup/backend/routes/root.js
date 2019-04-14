const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;


router.get('/', async (req, res, next) => {
  try {
    await db.query(
      'select p.id as Personid, p.firstname as Personfirstname, p.pre, p.middlename, p.lastname, p.suf, ' +
      'p.address as personaddress, p.city as personcity, p.state as personstate, p.zip as personzip, p.email, ' +
      'p.homephone as personhome, p.workphone as personwork, p.mobilephone as personmobile, ' +
      'pet.id as petid, pet.name as petname, pet.sex as petsex, pet.type as pettype, pet.breed as petbreed, ' +
      'pet.color as petcolor, pet.weight as petweight, pet.dateofbirth as petdob, pet.dateofdeath as petdod, ' +
      'pet.timeofdeath as pettod, pet.age as petage, ' +
      'cd.id as detailsid, cd.crematory, cd.status, cd.type as detailstype, cd.clinic, cd.print, cd.fur, cd.returnto, ' +
      'cd.returntoid, cd.returnperson, cd.returnplace, cd.returnphone, cd.returnaddress, cd.returncity, ' +
      'cd.returnstate, cd.returnzip, cd.note, cd.ownerid as detailsownid, cd.petid as detailspetid ' +
      'from petcase pc ' +
      'inner join person p on pc.personid = p.id '+
      'inner join pet on pc.petid = pet.id ' +
      'inner join cremationdetails cd on pc.detailsid = cd.id'
      )
    .then((result) => {
    //  console.log(result.rows);
      res.send(result.rows);
    })
  }
  catch(e) {
    console.log(`Unable to get Cases! ${e}`);
  }
  finally {
    console.log('Request Completed');
  }
});



router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
     const query = insertPerson(req.body);
     await db.query(query.sql, query.values)
     .then((result) => {
      console.log('Person Added!');
     })
  }
  catch(e) {
   // console.log(`Unable to post! ${e}`);
  }
  finally {
    console.log('Request Completed');
  }
});

function insertPerson(body) {
  const query = {
    sql:'INSERT INTO person( ' +
    '  firstname, pre, middlename, lastname, suf, address, city, state, zip, email, homephone, workphone, mobilephone ) ' +
    ' VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13); ',
    values: [body.firstname, body.pre, body.middlename,
      body.lastname, body.suf, body.address, body.city,
      body.state, body.zip, body.email, body.home, body.work, body.mobile]
  }
  return query;
}
