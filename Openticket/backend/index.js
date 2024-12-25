const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
const mysql = require('mysql2');
const path = require('path')
const multer = require('multer');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static('public'));

const storage = multer.diskStorage({   
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname,'public/images'));
  },
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

var maxsize = 2 * 1000 * 1000;

const uploading = multer({
  storage:storage,
  limits:{
    fileSize :maxsize
  }
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'openticket'
});
  
db.connect((err) => {
    if (err) { 
      console.error('Error in connecting to database:', err);
      return;
    }
    console.log("Connected to the Database!");
  });

app.post('/employeeregistery',(req,res)=>{
    const {id , name , email , department , password} = req.body;
    if (!id || !name || !email || !department || !password ) {
        res.status(400).json({error:'All fields are required!'})
    };
    db.query("INSERT INTO register (id, name, email, department, password, role) VALUES (?,?,?,?,?,?)",
      [id,name,email,department,password,"employee"],
        (err,results)=>{
          if (err) {
            res.status(500).json({error:'Error in inserting data'});
          }
          res.status(200).json({message:'Register successful!'})
        });
});


app.post('/userregistery',(req,res)=>{
  const {id , name , email , password} = req.body;
  if (!id || !name || !email || !password ) {
      res.status(400).json({error:'All fields are required!'})
  };
  db.query("INSERT INTO register (id, name, email, department, password, role) VALUES (?,?,?,?,?,?)",
    [id,name,email,"",password,"user"],
      (err,results)=>{
        if (err) {
          res.status(500).json({error:'Error in inserting data'});
        }
        res.status(200).json({message:'Register successful!'})
  });
});
 
app.get('/registers',(req,res)=>{
  db.query("SELECT * FROM register",(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'});
    }
    res.json(results);
  });
});

app.post('/admin',(req,res)=>{
  const {name,email} = req.body;
  
  if (!name || !email) {
    res.status(400).json({error:'All fields are required!'})
  }
  db.query("UPDATE register SET name = ?,email = ? WHERE role = ?",[name,email,"admin"],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on Getting data !'});
    }
    res.json(results);
  });
});

app.get('/admin',(req,res)=>{
  db.query("SELECT * FROM register WHERE role = ?",["admin"],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on Getting data !'});
    }
    res.json(results);
  });
});

app.post('/employee',(req,res)=>{
  const {id , email, name} = req.body;

  if (!id || !name || !email) {
    res.status(400).json({error:'All fields are required!'})
  }
  db.query("UPDATE register SET name = ?,email = ? WHERE id = ?",[name,email,id],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on Getting data !'});  
    }
    res.json(results);
  });
});


app.post('/user',(req,res)=>{
  const {id , email, name} = req.body;

  if (!id || !name || !email) {
    res.status(400).json({error:'All fields are required!'})
  }
  db.query("UPDATE register SET name = ?,email = ? WHERE id = ?",[name,email,id],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on Getting data !'});  
    }
    res.json(results);
  });
});

app.post('/deleteregister',(req,res)=>{
  const {id} = req.body;
  
  if (!id) {
    res.status(400).json({error:'Field cannot be empty!'});
  }
  db.query("DELETE FROM register WHERE id = ?",[id],(err,results)=>{
    if (err) {
      res.status(400).json({eror:"Error in getting the data"});
    }
    res.json(results);
  });
});

app.put('/loggedinEmployee', (req, res) => {
  const { email } = req.body;
  console.log(email);
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required!' });
  }
  db.query("SELECT * FROM register WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(400).json({ error: 'Error getting data!' });
    }
    res.json(results); 
  });
  app.get('/loggedinEmployee', (req, res) => {
    db.query("SELECT * FROM register WHERE email = ?", [email], (err, results) => {
      if (err) {
        return res.status(400).json({ error: 'Error getting data!' });
      }
      res.json(results);
    });
  });  
});

app.put('/loggedinUser', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required!' });
  }
  db.query("SELECT * FROM register WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(400).json({ error: 'Error getting data!' });
    }
    res.json(results); 
  });
  app.get('/loggedinUser', (req, res) => {
    db.query("SELECT * FROM register WHERE email = ?", [email], (err, results) => {
      if (err) {
        return res.status(400).json({ error: 'Error getting data!' });
      }
      res.json(results);
    });
  });  
});

app.post('/Tickets',uploading.single('screenshot'),(req,res)=>{
  const {id,username,useremail,department,complaint,} = req.body;
  const screenshot = req.file ? req.file.filename : null;
  console.log(req.body , req.file);
  
  if (!id || !username || !useremail || !department || !complaint ) {
    res.status(400).json({error:'All fields are required!'})
  };

  db.query("INSERT INTO tickets (id,username,useremail,department,complaint,screenshot,solution) VALUES (?,?,?,?,?,?,?)",
  [id,username,useremail,department,complaint,screenshot,''],
  (err,results)=>{ 
    if (err) {
      res.status(500).json({error:'Error in inserting data'}); 
    }
      res.status(200).json({message:'Register successful!'});
  }); 
}); 

app.get('/Tickets',(req,res)=>{
  db.query("SELECT * FROM tickets",(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'});
    }
    res.json(results);
  }); 
});

app.put('/userTickets',(req,res)=>{
  const {email} = req.body; 
  if (!email) {
    res.status(400).json({error:'Field is required!'})  
  };
  db.query("SELECT * FROM tickets WHERE useremail = ?",[email],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'});
    };
    res.json(results);
  });
}); 

app.get('/department1tickets',(req,res)=>{
  db.query("SELECT * FROM tickets WHERE department = ?",["Department - 1"],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'});
    };
    res.json(results);
  });
});

app.get('/department2tickets',(req,res)=>{
  db.query("SELECT * FROM tickets WHERE department = ?",["Department - 2"],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'});
    };
    res.json(results);
    console.log(results);
    
  });
});

app.get('/department3tickets',(req,res)=>{
  db.query("SELECT * FROM tickets WHERE department = ?",["Department - 3"],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'});
    };
    res.json(results);
  });
});

app.post('/employeetickets',(req,res)=>{
  const {ticid,empid} = req.body;
  if (!ticid ||  !empid){
    res.status(400).json({error:'Field is required'})
  }
  db.query("UPDATE tickets SET employeeid = ? WHERE id = ?",[empid,ticid],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'})
    }
    res.json(results) 
  });
});

app.post('/declinedtickets',(req,res)=>{
  const {id} = req.body;
  if (!id){
    res.status(400).json({error:'Field is required'})
  }
  db.query("UPDATE tickets SET status = ? WHERE id = ?",["Ticket Declined",id],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'})
    }
    res.json(results)
  }); 
});

app.post('/closeticket',(req,res)=>{
  const {id} = req.body;
  if (!id){
    res.status(400).json({error:'Field is required'})
  }
  db.query("UPDATE tickets SET status = ? WHERE id = ?",["Ticket Closed",id],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'})
    }
    res.json(results)
  }); 
});

app.post('/ticketmovedadmin',(req,res)=>{
  const {id} = req.body;
  if (!id){
    res.status(400).json({error:'Field is required'})
  }
  db.query("UPDATE tickets SET status = ? WHERE id = ?",["Moved to Admin",id],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'})
    }
    res.json(results)
  }); 
});

app.post('/admintickets',(req,res)=>{
  const {id} = req.body;
  if (!id){
    res.status(400).json({error:'Field is required'}) 
  }
  db.query("UPDATE tickets SET status = ? WHERE id = ?",["In Admin Bucket",id],(err,results)=>{
    if (err) {
      res.status(400).json({error:'Error on getting data!'})
    }
    res.json(results)
  }); 
});

app.listen(7000,()=>{
  console.log('Server is running!')
});    