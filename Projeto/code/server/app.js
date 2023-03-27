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

//const makeQuery = util.promisify(con.query).bind(con);
//const hashPassword = util.promisify(bcrypt.hash).bind(bcrypt);
//const comparePassword = util.promisify(bcrypt.compare).bind(bcrypt);


/*app.post("/user", async (req, res) => {
  // const name = req.body.name || "";
  const email = req.body.email;
  const password = req.body.password;
  const type = req.body.type;
  let haserror=false;
  try {
  const resultado1 = await makeQuery(`SELECT * FROM User WHERE email='${email}';`);
  console.log(resultado1);
  }
  catch(err) {
    haserror=true;
    res.send(err);
    console.log(err);
    
  }
 if(!haserror) {
 if (resultado1.length == 0) {
      try {
      const hash = await hashPassword(password,saltRounds);
      }
      catch(err2) {
        haserror=true;
        res.send(err2);
        console.log(err2);
      }
      if(!haserror) {
      try {
      const resultado2 = await makeQuery(`INSERT INTO User (email,password) Values('${email}','${hash}');`);
      res.send({email:email});
      }
      catch(err3) {
        haserror=true;
        res.send(err3);
        console.log(err3);
      }
  
    }
  }

  else {
   if(!haserror) {
   res.send({ msg: "User already exists", req: req.body });
   }
  }
 }

});*/

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

/*app.post("/login", async (req,res)=> {
  const email = req.body.email;
  const password = req.body.password;
  haserror=false;
  try {
  const resultado1 = await makeQuery(`SELECT * FROM User WHERE email='${email}';`);
  }
  catch(err) {
    haserror=true;
    res.send(err);
    console.log(err);
  }
  if (!haserror) {
    if (resultado1.length > 0) {
      try {
      const resultadoComparacao = await comparePassword(password,result[0].password);
      }
      catch (err) {
        haserror=true;
        res.send(err);
        console.log(err);
      }
      if (!haserror) {
        if (resultadoComparacao) {
          req.session.user = {
            id: resultado[0].id,
            name: resultado[0].name,
            email: resultado[0].email,
            type: resultado[0].type,
          };
          res.send(req.session.user);
        }
        else {
          res.send({ msg: "Wrong password" });
        }
      }
    }
    else {
      res.send({ msg: "Account not found" });
    }
  }
})*/

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
