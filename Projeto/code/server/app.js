const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 15;





app.get('/',(req,res,next) => {
    res.sendFile(path.join(__dirname,'page/index.html'));
})


var con = mysql.createPool({
    host: "appserver-01.alunos.di.fc.ul.pt",
    user: "asw29",
    password: "tiagodedeus",
    database: "asw29"
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

    con.query(`SELECT * FROM User WHERE email='${email}';`,(err,result) => {
        if (err) {
            res.send(err);
        }
        if (result.length >0) {
            bcrypt.compare(password,result[0].password,(err,result) =>{
                if (result) {
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





const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Listening on port ${port}!`);
});
