const Router = require("express-promise-router");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

const router = new Router();

module.exports = router;

router.get("/get/cases", async (req, res, next) => {
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
          "inner join cremationdetails cd on pc.detailsid = cd.id"
      )
      .then(result => {
        //  console.log(result.rows);
        res.send(result.rows);
      });
  } catch (e) {
    console.log(`Unable to get Cases! ${e}`);
  } finally {
    console.log("Get CasesRequest Completed");
  }
});

router.post("/post/person", async (req, res, next) => {
  try {
    let query = insertPerson(req.body);
    await db.query(query.sql, query.values).then(result => {});
  } catch (e) {
    console.log(`Unable to post! ${e}`);
  } finally {
    console.log("Person Request Completed");
  }
});

router.post("/post/pet", async (req, res, next) => {
  try {
    let query = insertPet(req.body);
    await db.query(query.sql, query.values).then(result => {
      console.log("Pet Added!");
    });
  } catch (e) {
    console.log(`Unable to post! ${e}`);
  } finally {
    console.log("Pet Request Completed");
  }
});

router.post("/post/details", async (req, res, next) => {
  try {
    let query = insertDetails(req.body);
    await db.query(query.sql, query.values).then(result => {
      console.log("Details Added!");
      res.send(result.rows);
    });
  } catch (e) {
    console.log(`Unable to post! ${e}`);
  } finally {
    console.log("Details Request Completed");
  }
});

router.post("/post/petcase", checkAuth, async (req, res, next) => {
  try {
    await db.query("BEGIN");
    //console.log(req.body);
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
        });
      });
    });

    await db.query("COMMIT");
  } catch (e) {
    console.log(`Failed to execute ${e}`);
    await db.query("ROLLBACK");
  } finally {
    console.log("connection closed");
  }
});

router.post("/signup", async (req, res, next) => {
  let username = req.body.username;
  let password;
  let user;
  await db
    .query("select * from users where username = ($1) limit 1", [username])
    .then(result => {
      user = result.rows[0];
    });
  if (user !== undefined) {
    // someone already has that username send error
    return res.status(206).json({
      message: "Username taken, please try again!",
      result: ``,
      accountCreated: false
    });
  } else {
    // username is available
    try {
      bcrypt.hash(req.body.password, 2).then(hash => {
        password = hash;
      });
      await db.query("BEGIN");
      await db
        .query(
          " INSERT INTO users( username, password ) " + " VALUES ( $1, $2 ) ;",
          [username, password]
        )
        .then(result => {
          res.status(201).json({
            message: "User Created!",
            result: result,
            accountCreated: true
          });
        });
      await db.query("COMMIT");
    } catch (e) {
      console.log(`Failed to create new user... ${e}`);
      await db.query("ROLLBACK");
      return res.status(409).json({
        message: "Unable to create username, please try again!",
        result: `${e}`,
        accountCreated: false
      });
    }
  }
});

router.post("/login", async (req, res, next) => {
  let user;
  let token;
  await db
    .query("select * from users where username = ($1) limit 1", [
      req.body.username
    ])
    .then(result => {
      user = result.rows[0];
    });

  if (user === undefined) {
    // no username match
    return res.status(401).json({
      message: "Login Failed. Please check your username, and password."
    });
  } else {
    // check password
    try {
      const match = bcrypt.compare(req.body.password, user.password);
      if (match) {
        //login
        token = jwt.sign(
          { username: user.username, userid: user.id },
          "secret_should_beLonger",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Login successful!",
          token: token
        });
      }
    } catch (e) {
      console.log(`Failed to login... ${e}`);
      return res.status(401).json({
        message:
          "Login Failed. Please check your username, and password. Please try again!",
        result: `${e}`
      });
    }
  }
});

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

function insertPet(body) {
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

function updateDetailsIDs(personid, petid, detailsid) {
  const query = {
    sql:
      "UPDATE cremationdetails SET ownerid=($1), petid=($2) WHERE id=($3) VALUES($1, $2, $3)",
    values: [personid, petid, detailsid]
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

function findUser(username) {
  db.query("select * from users where username = ($1) limit 1", [
    username
  ]).then(result => {
    return result.rows[0];
  });
}
