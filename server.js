const fs = require('fs');
const exp = require('express');
const path = require('path');

const obj = new exp();
const PORT = process.env.PORT || 3000;

obj.get('/', (req,res)=>{
    res.redirect('/form');
});

obj.get('/form',(req,res)=>{
        res.sendFile(path.join(__dirname,'index.html'));
})

obj.get('/access_data',(req,res)=>{
        const student ={
                Name: req.query.name,
                Reg_id: req.query.regid,
                Password: req.query.password,
                Secton: req.query.section,
                University: req.query.university,
                Gender: req.query.gender
        }
        const data = JSON.stringify(student,null,2) + "\n";
        
        fs.appendFile("Student.txt",data,(err)=>{
                if(err){
                        return res.send("Error Saving Data");
                }
                res.send("Data Saved Successfully");
        })
});
obj.get('/data',(req,res)=>{
    res.sendFile(path.join(__dirname,"Student.txt"));
});
obj.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
});

