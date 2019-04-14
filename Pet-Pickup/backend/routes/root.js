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
      console.log(result.rows);
      res.send(result.rows);
    })
  }
  catch(e) {
    console.log(`Something wrong happened! ${e}`);
  }
  finally {
    await db.end();
    console.log('Client Disconnected!');
  }
});
