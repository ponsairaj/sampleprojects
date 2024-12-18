const express = require('express');

const app = express();

app.get('/home',(req,res)=>{
    res.json({message:"Welcome to the Openticket server!"})
});

app.listen(7000,()=>{
    console.log('Server is running!');
});