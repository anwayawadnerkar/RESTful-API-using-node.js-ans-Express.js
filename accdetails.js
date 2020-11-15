const express = require('express');
const parser=require('body-parser');
const mysql=require('mysql');
const app=express();


// parse application/json data
app.use(parser.json());

//create database connection
const con=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'hr'
});

con.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected......');
});


//list all person details
// app.get(uri,callback_function)
app.get('/accdetails',(request,response)=>{
    let sql='select *from hr.accdetails';
    con.query(sql,(err,result)=>{
        if(err)
        throw err;
        else{
            console.log(result);
        response.send(result);}
    });
});


//show a single record of account
app.get('/accdetails/:id',(request,response)=>{
    let sql='select *from hr.accdetails where id='+request.params.id;

    let query=con.query(sql,(err,result)=>{
        if(err)
        throw err;
        response.send(result);

    });
});

// add new account's record
app.post('/accdetails',(request,response)=>{
    let data={name:request.body.name,address:request.body.address,mobile:request.body.mobile,email:request.body.email,age:request.body.age,dob:request.body.dob};
    let sql='insert into hr.accdetails SET ?';
    let query=con.query(sql,data,(err,result)=>{
        if(err)
            throw err;
            
        else if (result.affectedRows>0)
        response.send('account details inserted with '+result.insertId);
    });
});

//update account details
app.put('/accdetails/:id',(request,response)=>{
    let sql = 'update hr.accdetails set name=\''+request.body.name+'\',email=\''+request.body.email+'\',age='+request.body.age+' where id='+request.params.id;
    let query=con.query(sql,(err,request)=>{
        if(err)
        throw err;
        else if (result.affectedRows>0)
        response.send('order details inserted with'+result.insertId);
    });
});

//delete account record
app.delete('/accdetails/:id',(request,response)=>{
    let sql="delete from hr.accdetails where id="+request.params.id;
let query= con.query(sql,(err,result)=>{
    if(err)
    throw err;
    response.send(result);
});

});





app.listen(3000,()=>{
    console.log('Server started on port 3000...');
    });