const express = require('express');
const cors = require('cors');
const path = require('path');




const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.resolve(__dirname, "./build")));
app.use(express.json());
const axios = require('axios')


app.get('/api/chat', (req, res)=>{

    let pageNumber = req.body.page;
    axios({
        method: 'GET',
        url: 'http://3.111.128.67/assignment/chat',
        params: {page: pageNumber}
    }).then(resp=>{
        res.json(resp.data);       
    }).catch(e=>{
        console.error(e);
    })

})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

app.listen(5000, ()=>{
    console.log("api started");
})