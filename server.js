const fs = require('fs');
const exp = require('express');
const path = require('path');
var encoded = exp.urlencoded({extended:true})

const obj = new exp();
const PORT = process.env.PORT || 3000;

obj.get('/', (req,res)=>{
    res.redirect('/form');
});

obj.get('/form',(req,res)=>{
        res.sendFile(path.join(__dirname,'index.html'));
})

obj.post('/access_data',encoded,(req,res)=>{
        const student ={
                Name: req.body.name,
                Reg_id: req.body.regid,
                Password: req.body.password,
                Secton: req.body.section,
                University: req.body.university,
                Gender: req.body.gender
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

