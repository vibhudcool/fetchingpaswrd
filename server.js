const fs = require('fs');
const exp = require('express');

const obj = new exp();
const PORT = process.env.PORT || 3000;
obj.get('/form',(req,res)=>{
        res.sendFile(__dirname+'/formcreate.html');

})

obj.get('/access_data',(req,res)=>{
        const student ={
                Name: req.query.name,
                Reg_id: req.query.regid,
                Password: req.query.password,
                University: req.query.university,
                Gender: req.query.gender
        }
        const data = JSON.stringify(student,null,2) + "\n";
        
        fs.appendFile("Student.txt",data,(err)=>{
                if(err){
                        throw err;
                }
                res.send("Data Saved Successfully");
        })
});
obj.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
});

