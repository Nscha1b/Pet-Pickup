const Router = require("express-promise-router");
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

const router = new Router();

module.exports = router;

// This is used to get cases on the Dashboard...
router.get("/get/cases", checkAuth, async (req, res, next) => {
  try {
    let caseCount = 0;
    await db
      .query(
        "select count(*) " +
          "from petcase pc " +
          "inner join person p on pc.personid = p.id " +
          "inner join pet on pc.petid = pet.id " +
          "inner join cremationdetails cd on pc.detailsid = cd.id " +
          "where cd.clinic like $1 " +
          "limit ($2) "
, ['%'+req.query.filter+'%', req.query.howMany]
      ).then(result => {
        caseCount = result.rows[0].count;
      });
    await db
      .query(
        "select p.id as Personid, p.firstname as Personfirstname, p.pre, p.middlename, p.lastname, p.suf, " +
          "p.address as personaddress, p.city as personcity, p.state as personstate, p.zip as personzip, p.email, " +
          "p.homephone as personhome, p.workphone as personwork, p.mobilephone as personmobile, " +
          "pet.id as petid, pet.name as petname, pet.sex as petsex, pet.type as pettype, pet.breed as petbreed, " +
          "pet.color as petcolor, pet.weight as petweight, pet.dateofbirth as petdob, pet.dateofdeath as petdod, " +
          "pet.timeofdeath as pettod, pet.age as petage, " +
          "cd.id as detailsid, cd.crematory, cd.status, cd.type as detailstype, cd.clinic, cd.print, cd.fur, cd.returnto, " +
          "cd.returntoid, cd.returnperson, cd.returnplace, cd.returnphone, cd.returnaddress, cd.returncity, " +
          "cd.returnstate, cd.returnzip, cd.note, cd.ownerid as detailsownid, cd.petid as detailspetid " +
          "from petcase pc " +
          "inner join person p on pc.personid = p.id " +
          "inner join pet on pc.petid = pet.id " +
          "inner join cremationdetails cd on pc.detailsid = cd.id " +
          "where cd.clinic like $1 " +
          "order by ($2) " +
          "limit ($3) " +
          "offset ($4) ", ['%'+req.query.filter+'%', req.query.orderBy, req.query.howMany, req.query.offset]
      )
      .then(result => {
        const data = {rows: result.rows, caseCount: +caseCount};
        res.status(200).send(data);
      });
  } catch (e) {
    console.log(`Unable to get Cases! ${e}`);
    res.status(400).json({
      message: `Unable to get Cases! ${e}`,
    });
  } finally {
    console.log("Get CasesRequest Completed");
  }
});


// this is used for searching cases...
router.get("/get/searchCases", checkAuth, async (req, res, next) => {
  let where = '';
  try {
    if(req.query.searchBy === 'Owner Name') {
      where = "where LOWER(p.firstname) like $1 " +
              "or " +
              "LOWER(p.lastname) like $1 ";
    } else{
      //search by pet
      where = "where LOWER(pet.name) like $1 "
    }
    let caseCount = 0;
    await db
      .query(
        "select count(*) " +
          "from petcase pc " +
          "inner join person p on pc.personid = p.id " +
          "inner join pet on pc.petid = pet.id " +
          "inner join cremationdetails cd on pc.detailsid = cd.id " +
          where +
          "limit ALL "
, [req.query.filter+'%']
      ).then(result => {
        caseCount = result.rows[0].count;
      });
    await db
      .query(
        "select p.id as Personid, p.firstname as Personfirstname, p.pre, p.middlename, p.lastname, p.suf, " +
          "p.address as personaddress, p.city as personcity, p.state as personstate, p.zip as personzip, p.email, " +
          "p.homephone as personhome, p.workphone as personwork, p.mobilephone as personmobile, " +
          "pet.id as petid, pet.name as petname, pet.sex as petsex, pet.type as pettype, pet.breed as petbreed, " +
          "pet.color as petcolor, pet.weight as petweight, pet.dateofbirth as petdob, pet.dateofdeath as petdod, " +
          "pet.timeofdeath as pettod, pet.age as petage, " +
          "cd.id as detailsid, cd.crematory, cd.status, cd.type as detailstype, cd.clinic, cd.print, cd.fur, cd.returnto, " +
          "cd.returntoid, cd.returnperson, cd.returnplace, cd.returnphone, cd.returnaddress, cd.returncity, " +
          "cd.returnstate, cd.returnzip, cd.note, cd.ownerid as detailsownid, cd.petid as detailspetid " +
          "from petcase pc " +
          "inner join person p on pc.personid = p.id " +
          "inner join pet on pc.petid = pet.id " +
          "inner join cremationdetails cd on pc.detailsid = cd.id " +
          where +
          "order by ($2) " +
          "limit ($3) " +
          "offset ($4) ", [req.query.filter+'%', req.query.orderBy, req.query.howMany, req.query.offset]
      )
      .then(result => {
        const data = {rows: result.rows, caseCount: +caseCount};
        res.status(200).send(data);
      });
  } catch (e) {
    console.log(`Unable to get Cases! ${e}`);
    res.status(400).json({
      message: `Unable to get Cases! ${e}`,
    });
  } finally {
    console.log("Get CasesRequest Completed");
  }
});


// loading an individual case
router.get("/get/loadCase", checkAuth, async (req, res, next) => {
  try {
    await db
      .query(
        "select p.id as Personid, p.firstname as Personfirstname, p.pre, p.middlename, p.lastname, p.suf, " +
          "p.address as personaddress, p.city as personcity, p.state as personstate, p.zip as personzip, p.email, " +
          "p.homephone as personhome, p.workphone as personwork, p.mobilephone as personmobile, " +
          "pet.id as petid, pet.name as petname, pet.sex as petsex, pet.type as pettype, pet.breed as petbreed, " +
          "pet.color as petcolor, pet.weight as petweight, pet.dateofbirth as petdob, pet.dateofdeath as petdod, " +
          "pet.timeofdeath as pettod, pet.age as petage, " +
          "cd.id as detailsid, cd.crematory, cd.status, cd.type as detailstype, cd.clinic, cd.print, cd.fur, cd.returnto, " +
          "cd.returntoid, cd.returnperson, cd.returnplace, cd.returnphone, cd.returnaddress, cd.returncity, " +
          "cd.returnstate, cd.returnzip, cd.note, cd.ownerid as detailsownid, cd.petid as detailspetid " +
          "from petcase pc " +
          "inner join person p on pc.personid = p.id " +
          "inner join pet on pc.petid = pet.id " +
          "inner join cremationdetails cd on pc.detailsid = cd.id " +
          "where p.id = $1 " , [+req.query.filter]
      )
      .then(result => {
        const data = {rows: result.rows};
        res.status(200).send(data);
      });
  } catch (e) {
    console.log(`Unable to get Case! ${e}`);
    res.status(400).json({
      message: `Unable to get Case! ${e}`,
    });
  } finally {
    console.log("Get CaseRequest Completed");
  }
});


// Updating a case
router.post("/post/updatePetCase", checkAuth, async (req, res, next) => {
  try {
    let detailsID;
    await db
    .query(
      "SELECT detailsid from petcase where personid = $1 and petid = $2 "
, [req.body.ownerid, req.body.petid]
    ).then(result => {
      detailsID = result.rows[0].detailsid;
    });

    await db.query("BEGIN");
    let person = updatePerson(req.body);
    let pet = updatePet(req.body);
    let details = updateDetails(req.body, detailsID);

    await db.query(person.sql, person.values).then(result => {
    // console.log(result);
    });
    await db.query(pet.sql, pet.values).then(result => {
    // console.log(result);
    });
    await db.query(details.sql, details.values).then(result => {
    // console.log(result);
      console.log(details.values);
    })
    .then((result) => {
          console.log("We Made it!!!");
          res.status(201).json({
            message: "Case Updated!",
            result: result,
            caseCreated: true
          });
        });

    await db.query("COMMIT");
  } catch (e) {
    console.log(`Failed to update ${e}`);
    res.status(409).json({
      message: `Failed to update! ${e}`,
    });
    await db.query("ROLLBACK");
  } finally {
    console.log("connection closed");
  }
});


// Adding a petcase
router.post("/post/petcase", checkAuth, async (req, res, next) => {
  try {
    await db.query("BEGIN");
    let person = insertPerson(req.body);
    let pet = insertPet(req.body);
    let details = insertDetails(req.body);
    let newPersonID = null;
    let newPetID = null;
    let detailsID = null;
    await db.query(person.sql, person.values).then(result => {
      newPersonID = JSON.stringify(result.rows[0].id);
    });
    await db.query(pet.sql, pet.values).then(result => {
      newPetID = JSON.stringify(result.rows[0].id);
    });
    await db.query(details.sql, details.values).then(result => {
      detailsID = JSON.stringify(result.rows[0].id);
      db.query(
        "UPDATE cremationdetails SET ownerid = ($1), petid = ($2) where id = ($3)",
        [newPersonID, newPetID, detailsID]
      ).then(() => {
        db.query(
          "INSERT INTO petcase(personid, petid, detailsid) VALUES($1, $2, $3)",
          [newPersonID, newPetID, detailsID]
        ).then(() => {
          console.log("We Made it!!!");
          res.status(201).json({
            message: "Case Added!",
            result: result,
            caseCreated: true
          });
        });
      });
    });

    await db.query("COMMIT");
  } catch (e) {
    console.log(`Failed to execute ${e}`);
    res.status(409).json({
      message: `Unable to Add Case! ${e}`,
    });
    await db.query("ROLLBACK");
  } finally {
    console.log("connection closed");
  }
});




// Functions created to save basic querys....
function insertPerson(body) {
  const query = {
    sql:
      "INSERT INTO person( " +
      "  firstname, pre, middlename, lastname, suf, address, city, state, zip, email, homephone, workphone, mobilephone ) " +
      " VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id ; ",
    values: [
      body.firstname,
      body.pre,
      body.middlename,
      body.lastname,
      body.suf,
      body.address,
      body.city,
      body.state,
      body.zip,
      body.email,
      body.home,
      body.work,
      body.mobile
    ]
  };
  query.values = blankToNull(query.values);
  return query;
}

function updatePerson(body) {
  const query = {
    sql:
      "UPDATE person SET " +
      "firstname = $1, pre = $2, middlename = $3, lastname = $4, suf = $5, address = $6, city = $7, " +
      "state = $8, zip = $9, email = $10, homephone = $11, workphone = $12, mobilephone = $13 " +
      "where person.id = $14",
    values: [
      body.firstname,
      body.pre,
      body.middlename,
      body.lastname,
      body.suf,
      body.address,
      body.city,
      body.state,
      body.zip,
      body.email,
      body.home,
      body.work,
      body.mobile,
      body.ownerid
    ]
  };
  query.values = blankToNull(query.values);
  return query;
}

function insertPet(body) {
  console.log(body);
  const query = {
    sql:
      "INSERT INTO pet( " +
      "   name, sex, type, breed, color, weight, dateofbirth, dateofdeath, timeofdeath, age) " +
      " VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id ; ",
    values: [
      body.name,
      body.sex,
      body.type,
      body.breed,
      body.color,
      body.weight,
      body.dateofbirth,
      body.dateofdeath,
      body.timeofdeath,
      body.age
    ]
  };
  query.values = blankToNull(query.values);
  console.log(query);
  return query;
}

function updatePet(body) {
  const query = {
    sql:
      "UPDATE pet SET " +
      "name = $1, sex = $2, type = $3, breed = $4, color = $5, " +
      "weight = $6, dateofbirth = $7, dateofdeath = $8, timeofdeath = $9, age = $10 " +
      "where pet.id = $11 ",
    values: [
      body.name,
      body.sex,
      body.type,
      body.breed,
      body.color,
      body.weight,
      body.dateofbirth,
      body.dateofdeath,
      body.timeofdeath,
      +body.age,
      body.petid
    ]
  };
  query.values = blankToNull(query.values);
  return query;
}

function insertDetails(body) {
  const query = {
    sql:
      "INSERT INTO cremationdetails( " +
      "   crematory, status, type, clinic, print, fur, returnto, returntoid, returnperson, " +
      "   returnplace, returnphone, returnaddress, returncity, returnstate, returnzip, note, ownerid, petid) " +
      " VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING id; ",
    values: [
      body.crematory,
      body.status,
      body.detailstype,
      body.clinic,
      body.print,
      body.fur,
      body.returnto,
      body.returntoid,
      body.returnperson,
      body.returnplace,
      body.returnphone,
      body.returnaddress,
      body.returncity,
      body.returnstate,
      body.returnzip,
      body.note,
      body.ownerid,
      body.petid
    ]
  };
  query.values = blankToNull(query.values);
  return query;
}

function updateDetails(body, detailsID) {
  const query = {
    sql:
      "UPDATE cremationdetails SET " +
      "crematory = $1, status = $2, type = $3, clinic = $4, print = $5, fur = $6, " +
      "returnto = $7, returntoid = $8, returnperson = $9, returnplace = $10, returnphone = $11, returnaddress = $12, " +
      "returncity = $13, returnstate = $14, returnzip = $15, note = $16, ownerid = $17, petid = $18 " +
      "WHERE cremationdetails.id = $19 ",
    values: [
      body.crematory,
      body.status,
      body.detailstype,
      body.clinic,
      body.print,
      body.fur,
      body.returnto,
      body.returntoid,
      body.returnperson,
      body.returnplace,
      body.returnphone,
      body.returnaddress,
      body.returncity,
      body.returnstate,
      body.returnzip,
      body.note,
      body.ownerid,
      body.petid,
      detailsID
    ]
  };
  query.values = blankToNull(query.values);
  return query;
}

function blankToNull(valueArr) {
  const replaced = valueArr.map(e => {
    if (e == "" || e == "-1") {
      e = null;
      return e;
    } else {
      return e;
    }
  });
  return replaced;
}
