const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const path = require("path");
const saltRounds = 15;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
//const util = require("util");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    key: "userID",
    secret: "nãoseioquepôraqui",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 60 * 24,
    },
  })
);
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"],
  })
);

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

var con = mysql.createPool({
  host: "database-1.c7cobqkowwcs.eu-west-3.rds.amazonaws.com",
  user: "admin",
  password: "tiagodedeus",
  database: "localshop_db",
});

/*            USER                 */

app.post("/user", (req, res) => {
  // const name = req.body.name || "";
  const email = req.body.email;
  const password = req.body.password;
  const type = req.body.type;
  // const fiscal_identifier = req.body.nif || "";
  // const phone = req.body.phone || "";
  //const haserror=false;

  con.query(`SELECT * FROM User WHERE email='${email}';`, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else if(result) {
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.send(err);
          console.log(err);
        }
        else if (hash) {
        con.query(
          `INSERT INTO User (email,password) Values('${email}','${hash}');`,
          (err, result) => {
            if (err) {
              res.send(err);
              console.log(err);
            }
            else if (result) {
              res.send({
                // name: name,
                email: email,
                // nif: nif,
                // phone: phone,
                // type: type,
              });
            }
          }
        );
      }
      });
    } else {
      res.send({ msg: "User already exists", req: req.body });
    }
  }
  });
});


/*            UNIDADE DE PRODUCAO                      */

app.post("/productionUnit", (req,res) => {
  const producerId = req.body.producerId;
  const capacity = req.body.capacity;
  const addressId = req.body.addressId;
  con.query(`INSERT INTO ProductionUnit(producer_id,capacity,address_id) Values(${producerId},${capacity},${addressId});`,
  (err,result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else if (result) {
      res.send(result);
      console.log(result);
    }
  }
  )
});

app.delete("/productionUnit/:id", (req,res) => {
  const id = req.params.id;
  con.query(`DELETE FROM ProductionUnit WHERE id = ${id};`,
  (err,result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else if (result) {
      console.log(result);
      res.send({msg:"Production Unit removed"});
    }
  })
});

/*            VEICULO UNIDADE DE PRODUCAO                      */

app.post("/vehicle", (req,res) => {
  const productionUnitId = req.body.productionUnitId;
  const licensePlate = req.body.licensePlate;
  const capacity = req.body.capacity;
  con.query(`SELECT * FROM Vehicle WHERE license_plate=${licensePlate};`,
  (err,result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else if (result) {
      if (result.length==0) {
        con.query(`INSERT INTO Vehicle Values(${productionUnitId},'${licensePlate}',${capacity});`,
        (err,result) => {
          if (err) {
            res.send(err);
            console.log(err);
          }
          else if (result) {
            res.send(result);
            console.log(result);
          }
        })
      }
      else {
        res.send({msg:"There is already a vehicle with that license plate"});
      }
    }
  })
})

/*            LOGIN                 */

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  con.query(`SELECT * FROM User WHERE email='${email}';`, (err, resultado) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    else if(resultado) {
    if (resultado.length > 0) {
      bcrypt.compare(password, resultado[0].password, (err, result) => {
        if (err) {
          res.send(err);
          console.log(err);
        }
        else if (result) {
          req.session.user = {
            id: resultado[0].id,
            name: resultado[0].name,
            email: resultado[0].email,
            type: resultado[0].type,
          };
          res.send(req.session.user);
        } else {
          res.send({ msg: "Wrong password" });
        }
      });
    } else {
      res.send({ msg: "Account not found" });
    }
  }
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy();
  res.send({ msg: "Logged out" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
