const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require("path");
const saltRounds = 15;
const cookieParser = require("cookie-parser");
const session = require('express-session');
const bodyParser = require('body-parser');



app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    key : 'userID',
    secret : 'nãoseioquepôraqui',
    resave : false,
    saveUnitialized : false,
    cookie : {
        maxAge : 60 * 1000 * 60 * 24
    }
}))




app.get('/',(req,res,next) => {
    res.sendFile(path.join(__dirname,'index.html'));
})


var con = mysql.createPool({
    host: "database-1.c7cobqkowwcs.eu-west-3.rds.amazonaws.com",
    user: "admin",
    password: "tiagodedeus",
    database: "localshop_db"
  });




app.post('/utilizador/consumidor', (req,res) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;
    const companyid = req.body.companyid;
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    con.query(`SELECT * FROM User WHERE email='${email}';`,(err,result)=> {
            if (err) {
                res.send(err);
            }
            if (result.length == 0) {
                bcrypt.hash(password,saltRounds,(err,hash) => {
                    con.query(`INSERT INTO User (first_name,last_name,email,password,phone,company,type,registration_date) Values('${name}','${lastname}','${email}','${hash}','${phone}',${companyid},'CONSUMER','${date}');`,(err,result) => {
                        if (err) {
                            res.send(err);
                        }

                })
        
                    res.send({name:name,lastname:lastname,email:email,phone:phone,companyid:companyid,date:date})
                }
        );
            }
            else {
                res.send({msg:'Utilizador já existe'})
            }
        });
    });

app.post('/utilizador/fornecedor', (req,res) => {
        const name = req.body.name;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        const companyid = req.body.companyid;
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        con.query(`SELECT * FROM User WHERE email='${email}';`,(err,result)=> {
                if (err) {
                    res.send(err);
                }
                if (result.length == 0) {
                    bcrypt.hash(password,saltRounds,(err,hash) => {
                        con.query(`INSERT INTO User (first_name,last_name,email,password,phone,company,type,registration_date) Values('${name}','${lastname}','${email}','${hash}','${phone}',${companyid},'SUPPLIER','${date}');`,(err,result) => {
                            if (err) {
                                res.send(err);
                            }
    
                    })
            
                        res.send({name:name,lastname:lastname,email:email,phone:phone,companyid:companyid,date:date})
                    }
            );
                }
                else {
                    res.send({msg:'Utilizador já existe'})
                }
            });
        });


app.post('/utilizador/transportador', (req,res) => {
            const name = req.body.name;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const password = req.body.password;
            const phone = req.body.phone;
            const companyid = req.body.companyid;
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            con.query(`SELECT * FROM User WHERE email='${email}';`,(err,result)=> {
                    if (err) {
                        res.send(err);
                    }
                    if (result.length == 0) {
                        bcrypt.hash(password,saltRounds,(err,hash) => {
                            con.query(`INSERT INTO User (first_name,last_name,email,password,phone,company,type,registration_date) Values('${name}','${lastname}','${email}','${hash}','${phone}',${companyid},'TRANSPORTER','${date}');`,(err,result) => {
                                if (err) {
                                    res.send(err);
                                }
        
                        })
                
                            res.send({name:name,lastname:lastname,email:email,phone:phone,companyid:companyid,date:date})
                        }
                );
                    }
                    else {
                        res.send({msg:'Utilizador já existe'})
                    }
                });
            });



app.post('/utilizador/administrador', (req,res) => {
                const name = req.body.name;
                const lastname = req.body.lastname;
                const email = req.body.email;
                const password = req.body.password;
                const phone = req.body.phone;
                const companyid = req.body.companyid;
                const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
                con.query(`SELECT * FROM User WHERE email='${email}';`,(err,result)=> {
                        if (err) {
                            res.send(err);
                        }
                        if (result.length == 0) {
                            bcrypt.hash(password,saltRounds,(err,hash) => {
                                con.query(`INSERT INTO User (first_name,last_name,email,password,phone,company,type,registration_date) Values('${name}','${lastname}','${email}','${hash}','${phone}',${companyid},'ADMINISTRATOR','${date}');`,(err,result) => {
                                    if (err) {
                                        res.send(err);
                                    }
            
                            })
                    
                                res.send({name:name,lastname:lastname,email:email,phone:phone,companyid:companyid,date:date})
                            }
                    );
                        }
                        else {
                            res.send({msg:'Utilizador já existe'})
                        }
                    });
                });



app.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    con.query(`SELECT * FROM User WHERE email='${email}';`,(err,resultado) => {
        if (err) {
            res.send(err);
        }
        if (resultado.length >0) {
            bcrypt.compare(password,resultado[0].password,(err,result) =>{
                if (result) {
                    req.session.user = {id:resultado[0].id,first_name:resultado[0].first_name,last_name:resultado[0].last_name,email:resultado[0].email};
                    res.send({msg:'Utilizador logado com sucesso'});
                }
                else {
                    res.send({msg:'A palavra-passe está incorreta'});
                }
            });

        }

        else {
            res.send({msg:'Conta não encontrada'});
        }
    })
})


app.get('/login',(req,res) => {
    if (req.session.user) {
        res.send({loggedIn : true, user:req.session.user});
    }

    else {
        res.send({loggedIn : false});
    }
})


app.post('/logout',(req,res) => {
    req.session.destroy();
})





const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Listening on port ${port}!`);
});
